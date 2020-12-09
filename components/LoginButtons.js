import { Button, Stack } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { FcGoogle } from 'react-icons/fc';
const LoginButtons = () => {
    const auth = useAuth();

    return (
        <Stack isInline>
                        <Button
              onClick={(e) => auth.signInWithGoogle()}
              backgroundColor="red"
              color="gray.900"
              variant="outline"
              fontWeight="medium"
              leftIcon={<FcGoogle />}
              mt={4}
              size="lg"
              _hover={{ bg: 'red.400' }}
              _active={{
                bg: 'gray.100',
                transform: 'scale(0.95)'
              }}
            >
              Sign In with Google
            </Button>
        </Stack>

);
};

export default LoginButtons;