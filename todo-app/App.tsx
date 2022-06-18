import { useEffect, useState } from "react";
import { Text, Platform, StatusBar } from 'react-native';
import { AppBar, Button } from "@react-native-material/core";

import { TodoData } from './src/types/todo';

import Listagem from './src/screens/Listagem';
import api from "./src/services/api";
import Cadastro from "./src/screens/Cadastro";

export default function App() {

    /**
     * "0" => Listagem
     * "1" => Cadastro
     */
    const [screenType, setScreenType] = useState(0);
    const [content, setContent] = useState([]);

    const [todo, setTodo] = useState<TodoData>();

    function getTodoList() {
        api.get("/todos")
            .then(response => {
                setContent(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getTodoList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenType]);

    function editTodo(todo: TodoData) {
        setTodo(todo);
        setScreenType(1);
    }

    function deleteTodo(id: string) {

        api.delete(`/todos/${id}`)
            .then(response => {
                if (response.status === 200) {
                    // setAlertType("success");
                    // setAlert("ToDo Removido com sucesso.");
                } else {
                    // setAlertType("danger");
                    // setAlert("Falha ao tentar remover Todo.");
                }
                getTodoList();
            })
            .catch((err) => {
                // setAlertType("danger");
                // setAlert("Falha ao tentar remover ToDo.");
                console.log("Error");
                console.log(err.stack);
            });
    }

    function insertSuccess() {
        // setAlertType("success");

        // setAlert(
        //     (todo !== "")
        //         ? "Todo Alterado com sucesso."
        //         : "Todo Inserido com sucesso."
        // );

        setScreenType(0); // Retorna para lista de Todos.
    }

    function insertFail(msg: Object) {
        // setAlertType("error");
        // setAlert(msg);
        window.scrollTo(0, 0);
    }


    return (
        <>
            <AppBar
                color="rgb(33, 150, 243)"
                style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
                title="ToDo App"
                trailing={props =>
                    screenType === 0 ? (
                        <Button
                            color="#fff"
                            variant="outlined"
                            title="Novo"
                            style={{ marginEnd: 4 }}
                            onPress={() => {
                                setTodo(undefined);
                                // setAlertType(""); 
                                setScreenType(1)
                            }}
                        />
                    ) : (
                        <Button
                            color="#fff"
                            variant="outlined"
                            title="Voltar"
                            compact
                            style={{ marginEnd: 4 }}
                            onPress={() => {
                                setTodo(undefined);
                                // setAlertType(""); 
                                setScreenType(0)
                            }}
                        />
                    )
                }
            />
                {
                    screenType === 0
                        ? (<Listagem
                            dataContent={content}
                            editTodo={editTodo}
                            deleteTodo={deleteTodo} />)
                        : (<Cadastro
                            todo={todo}
                            insertSuccess={insertSuccess}
                            insertFail={insertFail} />)
                }
        </>
    );
}
