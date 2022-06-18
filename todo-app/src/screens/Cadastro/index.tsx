import { Button, Divider, Flex, Text, TextInput } from '@react-native-material/core';
import React, { ReactElement, useState } from 'react';
import api from '../../services/api';

import { TodoData } from '../../types/todo';

interface CadastroProps {
    todo: TodoData | undefined;
    insertSuccess: () => void
    insertFail: (msg: string) => void
}

export default function Cadastro({ todo, insertSuccess, insertFail }: CadastroProps): ReactElement {

    const [title, setTitle] = useState((todo) ? todo.title : "");
    const [comment, setComment] = useState((todo) ? todo.comment : "");

    async function createTodo() {
        if (title && comment) {
            if (todo) {
                await api.patch(`/todos/${todo.id}`, { title, comment })
            } else {
                await api.post("/todos", { title, comment })
            }
            insertSuccess()
        } else {
            insertFail("Falha ao tentar cadastrar registro de ToDo.");
        }
    }

    return (
        <Flex fill style={{ backgroundColor: '#ddd' }}>
            <Text variant="h4" style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 10}}>
                {(todo) ? 'Alterar ToDo' : "Cadatrar Novo ToDo"}
            </Text>

            <Divider style={{ marginTop:20, marginBottom:20 }} />

            <TextInput
                style={{ margin: 10 }}
                label="Título"
                onChangeText={setTitle}
                value={title}
            />
            <TextInput
                style={{ margin: 10 }}
                label="Comentário"
                onChangeText={setComment}
                value={comment}
            />

            <Button
                color="#0c0"
                variant="contained"
                title={(todo) ? "Salvar" : "Cadastrar"}
                style={{ start: 0, end: 0, margin: 10 }}
                onPress={() => {
                    createTodo();
                }}
            />

        </Flex>
    );
}
