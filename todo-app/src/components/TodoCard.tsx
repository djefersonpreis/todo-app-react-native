import React from 'react';
import { ListItem, Button, Flex, Box } from "@react-native-material/core";
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { TodoData } from '../types/todo';

interface TodoCardProps {
    item: TodoData;
    onDelete: (id: string) => void
    onEdit: (todo: TodoData) => void
}

export default function TodoCard({ item, onDelete, onEdit }: TodoCardProps) {

    return (
        <ListItem
            title={(item.title) ? item.title : " "}
            secondaryText={item.comment}
            trailing={props => (
                <Flex inline>
                    <Box w={30}>
                        <TouchableOpacity onPress={() => onEdit(item)}>
                            <Feather name="edit" size={18} color="#0ff" />
                        </TouchableOpacity>
                    </Box>
                    <Box w={30}>
                        <TouchableOpacity onPress={() => onDelete(item.id)}>
                            <Feather name="trash" size={18} color="#f00" />
                        </TouchableOpacity>
                    </Box>
                </Flex>
            )}
        />
    )
}