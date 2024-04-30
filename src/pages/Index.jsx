import { Box, Button, Input, Textarea, SimpleGrid, useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const toast = useToast();

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!newNote.title || !newNote.content) {
      toast({
        title: 'Error',
        description: "Both title and content are required to add a note.",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setNotes([...notes, { ...newNote, id: Date.now() }]);
    setNewNote({ title: '', content: '' });
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const updateNote = (id, updatedNote) => {
    setNotes(notes.map(note => note.id === id ? updatedNote : note));
  };

  return (
    <Box p={5}>
      <Box mb={4}>
        <Input placeholder="Title" value={newNote.title} onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} />
        <Textarea placeholder="Content" value={newNote.content} mt={2} onChange={(e) => setNewNote({ ...newNote, content: e.target.value })} />
        <Button leftIcon={<FaPlus />} colorScheme="teal" mt={2} onClick={addNote}>Add Note</Button>
      </Box>
      <SimpleGrid columns={3} spacing={4}>
        {notes.map(note => (
          <Box key={note.id} p={5} shadow="md" borderWidth="1px">
            <Input value={note.title} onChange={(e) => updateNote(note.id, { ...note, title: e.target.value })} />
            <Textarea value={note.content} mt={2} onChange={(e) => updateNote(note.id, { ...note, content: e.target.value })} />
            <Button leftIcon={<FaTrash />} colorScheme="red" mt={2} onClick={() => deleteNote(note.id)}>Delete</Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Index;