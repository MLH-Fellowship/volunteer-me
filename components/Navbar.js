import React from 'react';
import { Link as NextLink } from "next/link";
import {
    Button,
    Flex,
    Link,
    Avatar,
    Icon
} from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { GoSignOut } from 'react-icons/go';

function Navbar() {
    const { user, signout } = useAuth();
    return (
        <Flex backgroundColor="white" mb={16} w="full">
            <Flex
                alignItems="center"
                justifyContent="space-between"
                pt={4}
                pb={4}
                maxW="1250px"
                margin="0 auto"
                w="full"
                px={8}
                h="70px"
            >
                <Flex>
                    <Icon name="logo" size="24px" mr={8} />
                    <Link href="/about">About</Link>
                    {user ?
                        <Link mr={4} href="/project">Project</Link>
                        : null
                    }
                    <Link href="/volunteer" mr={4}>Volunteer</Link>
                </Flex>
                <Flex justifyContent="center" alignItems="center">
                    {user ? (
                            <>
                                <Button leftIcon={<GoSignOut />} variant="ghost" mr={2} onClick={() => signout()}>
                                    Log Out
                                </Button>
                                <Avatar size="sm" src={user?.photoUrl} />
                            </>
                        )
                        :
                        (
                            <Link href="/" variant="ghost" mr={2} >
                                Log In
                            </Link>
                        )
                    }
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Navbar
