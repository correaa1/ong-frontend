import Link from 'next/link';
import { Box, Flex, Text, CloseButton, IconButton, Icon, Drawer, DrawerContent, useDisclosure, useColorModeValue } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

const LinkItems = [
  { name: 'Home', url: '/' },
  { name: 'Cadastro', url: '/cadastro' },
  { name: 'Lista de usuários', url: '/usuarios' },
  { name: 'Lista de entregas', url: '/entregas' },
];

export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" >
      <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} >
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg='blue.50'
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          ONG
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} url={link.url} onClose={onClose}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ url, onClose, children, ...rest }) => {
  return (
    <Link href={url}>
      <Box style={{ textDecoration: 'none' }} onClick={onClose}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          {...rest}
        >
          {children}
        </Flex>
      </Box>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton variant="outline" onClick={onOpen} aria-label="open menu" icon={<FiMenu />} />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};
