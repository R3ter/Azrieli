import {
    Button,
    Center,
    Text,
  } from '@chakra-ui/react';
  import { Input } from '@chakra-ui/react'
import { Link } from 'react-router-dom';

  export default function SearchComp() {
    return (
        <Center style={{display:'flex', flexWrap:'wrap', gap:'50px'}}>
        <Button
            padding={3}
            bg={'blue.400'}
            color={'white'}
            _hover={{
            bg: 'blue.500',
            }}>
            All Movies
        </Button>
        <Link to={'/AddMovie'} style={{width:'50%'}}>
        <Button
        padding={3}
            bg={'blue.400'}
            color={'white'}
            _hover={{
            bg: 'blue.500',
            }}>
            Add Movie
        </Button>
        </Link>
        <Text style={{display:'flex',gap:'10px'}}>Search <Input variant='outline' focusBorderColor='blue.500' placeholder='Search Movie' height='80%'/></Text>
        </Center>
    )}