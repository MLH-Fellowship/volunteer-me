import React, { useState } from "react";
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";
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
import { addVolunteer } from "@/lib/db";

function VolunteerFormModal({ children }) {
	const auth = useAuth();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { handleSubmit, register } = useForm();

	// query.pid stores the Project Id from the route
	const {query} = useRouter()

	const onCreateVolunteer = ({
		name,
		phone,
		email,
		description,
		skill,
		hours,
	}) => {
		const newVolunteer = {
			userId: auth.user.uid,
			projectId: query.pid,
			appliedAt: new Date().toISOString(),
			name,
			phone,
			email,
			description,
			skill,
			hours,
		};

		console.log(newVolunteer)
		addVolunteer(newVolunteer);

		toast({
			title: "Success!",
			description: "Your application has been submitted.",
			status: "success",
			duration: 5000,
			isClosable: true,
		});

		// mutate(
		// 	"/api/volunteer",
		// 	async (data) => {
		// 		return { volunteer: [...data.volunteer, newVolunteer] };
		// 	},
		// 	false
		// );

		onClose();
	};

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
				<ModalContent as="form" onSubmit={handleSubmit(onCreateVolunteer)}>
					<ModalHeader fontWeight="bold">Volunteer</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Public Name</FormLabel>
							<Input
								placeholder="My Project"
								name="name"
								ref={register({
									required: "Required",
								})}
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Public Phone</FormLabel>
							<Input
								placeholder="+1 989 134 5214"
								name="phone"
								ref={register({
									required: "Required",
								})}
							/>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Public Email</FormLabel>
							<Input
								placeholder="me@website.com"
								name="email"
								ref={register({
									required: "Required",
								})}
							/>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Brief application</FormLabel>
							<Input name="description"
								placeholder="Able to cook at large scale and organize chef assistants."
								ref={register({
									required: "Required",
								})} />
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Main Skill</FormLabel>
							<Select placeholder="Select focus"
								name="skill"
								ref={register({
									required: "Required",
								})}
							>
								<option value="cooking">Cooking</option>
								<option value="publicSpeaking">Public Speaking</option>
								<option value="organizing">Organizing</option>
								<option value="media">Media</option>
								<option value="handcrafts">Handcrafts</option>
								<option value="other">Other</option>
							</Select>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Availability (hours)</FormLabel>
							<NumberInput
								defaultValue={3}
								min={1}
								max={24}
							>
								<NumberInputField
									name="hours"
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
	)
}

export default VolunteerFormModal
