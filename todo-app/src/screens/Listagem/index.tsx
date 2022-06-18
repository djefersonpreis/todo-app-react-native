import { Flex } from '@react-native-material/core';
import React, { ReactElement } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
} from 'react-native';

import TodoCard from '../../components/TodoCard';
import { TodoData } from '../../types/todo';

interface ListagemProps {
    dataContent: TodoData[];
    editTodo: (todo: TodoData) => void
    deleteTodo: (todo: string) => void
}

export default function Listagem({ dataContent, editTodo, deleteTodo }: ListagemProps): ReactElement {

    return (
        <Flex fill style={{ backgroundColor: '#ddd' }}>
            {
                dataContent && (
                    <FlatList
                        data={dataContent}
                        keyboardShouldPersistTaps="never"
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TodoCard
                                item={item}
                                onDelete={deleteTodo}
                                onEdit={editTodo}
                            />
                        )}
                    />
                )
            }
        </Flex>
    );
}
