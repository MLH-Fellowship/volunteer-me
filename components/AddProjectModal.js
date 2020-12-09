import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useAuth } from "@/lib/auth";
import { mutate } from "swr";
import {
  Modal,
  ModelOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  useDisclosure,
  useToast,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
} from "@chakra-ui/react";

// for autofill
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { createProject } from "@/lib/db";

const libraries = ["places"];

// Seaech component handles autocomplete feature. Needs Places library.
const Search = ({ setLocation }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      // toronto coords
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });
  const handleInput = (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      // panTo({ lat, lng });

      // console.log("📍 Coordinates: ", { lat, lng });
      setLocation({ address, lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <Combobox onSelect={handleSelect}>
      <Input
        as={ComboboxInput}
        name="location"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Search on Google Maps"
      />
      <ComboboxPopover style={{ zIndex: "2000" }}>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              // <p>{description}</p>
              <ComboboxOption key={place_id} value={description}>
                <ComboboxOptionText />
              </ComboboxOption>
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

const AddProjectModal = ({ children }) => {
  const auth = useAuth();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();
  // Hook is used to load G. KEY, initialize G Maps and load Places library
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [location, setLocation] = useState({ address: "", lat: 0, lng: 0 });

  const onCreateProject = ({
    name,
    description,
    url,
    projectFocus,
    requiredVolunteers,
    // location,
    startDate,
    endDate,
  }) => {
    const newProject = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      description,
      url,
      projectFocus,
      requiredVolunteers,
      address: location.address,
      lat: location.lat,
      lng: location.lng,
      startDate,
      endDate,
    };

    createProject(newProject, auth.user.uid);

    toast({
      title: "Success!",
      description: "We've added your project.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    // mutate(
    //   "/api/projects/",
    //   async (data) => {
    //     return { projects: [...data.projects, newProject] };
    //   },
    //   false
    // );

    onClose();
  };

  // This are conditional "states" coming from the `react-google-maps` hooks
  // As this returns actual render stuff really fast that's why the following
  // code (such as other hooks) below them could not be run at first.
  // React enforces all hooks run. I.e. any conditionals as these that render anything
  // cause bad stuff
  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <>
      <Button
        onClick={onOpen}
        fontWeight="medium"
        maxW="200px"
        backgroundColor="gray.900"
        color="white"
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateProject)}>
          <ModalHeader fontWeight="bold">Add Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="My Project"
                name="name"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                placeholder="Need volunteers for climate awareness day."
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="https://website.com"
                name="url"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Focus</FormLabel>
              <Select
                placeholder="Select focus"
                name="projectFocus"
                ref={register({
                  required: "Required",
                })}
              >
                <option value="education">Education</option>
                <option value="climateChange">Climate Change</option>
                <option value="communityService">Community Service</option>
                <option value="protest">Protest</option>
                <option value="generalVolunteering">
                  General Volunteering
                </option>
                <option value="other">Other</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Volunteers Needed</FormLabel>
              <NumberInput defaultValue={5} min={1} max={300}>
                <NumberInputField
                  name="requiredVolunteers"
                  ref={register({
                    required: "Required",
                  })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Location</FormLabel>
              <Search setLocation={setLocation} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Start Date</FormLabel>
              <Input
                placeholder="01-01-2020"
                name="startDate"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>End Date</FormLabel>
              <Input
                placeholder="01-01-2021"
                name="endDate"
                ref={register({
                  required: "Required",
                })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button
              backgroundColor="#99FFFE"
              color="#194D4C"
              fontWeight="medium"
              type="submit"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddProjectModal;
