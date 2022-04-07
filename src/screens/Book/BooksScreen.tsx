import { useEffect, useState } from "react"
import { Alert, AlertButton, Button, Modal, Pressable, StyleSheet, Text, View } from "react-native"
import { Database } from "../../db/Database"
import { Book } from "../../models/Book"
import { BookService } from "../../services/BookService"
import { BookForm } from "./components/BookForm"
import { BookList } from "./components/BookList"

export const BooksScreen: React.FC = (props) => {
    const [books, setBooks] = useState<Book[]>([])
    const [book, setBook] = useState<Book>(null)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        loadBooks()
    }, [])

    const loadBooks = async () => {
        setBooks(await BookService.findAll())
    }

    const openModal = (data?: Book) => {
        setBook(data)
        setModalVisible(true)
    }

    const resetDatabase = () => {
        const btns: AlertButton[] = [
            {
                text: 'Yes',
                onPress: () => {
                    Database.initDb(true).then(() => loadBooks())
                }
            },
            { text: 'Cancel' }
        ]

        Alert.alert('Recreate database?', undefined, btns)
    }

    return <View style={styles.container}>
        <Text style={styles.title}>Library App</Text>

        <BookList
            books={books}
            onSelectBook={c => openModal(c)}
            onDeleteBook={() => loadBooks()}
        />

        <Button title="Add book" onPress={() => openModal()} />

        <Pressable 
            style={styles.resetDbBtn}
            onPress={() => resetDatabase()}
        >
            <Text>Reset database</Text>
        </Pressable>

        <Modal
            animationType="slide"
            transparent={!false}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={[styles.modalBackground, { backgroundColor: '#00000050' }]} >
                <View style={styles.modalView}>
                    <BookForm
                        data={book}
                        onSuccess={() => {
                            setModalVisible(false)
                            loadBooks()
                        }}
                    />
                </View>
            </View>
        </Modal>
    </View>
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    title: {
        fontSize: 26,
        marginBottom: 16
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: '90%',
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    resetDbBtn: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 2,
        marginTop: 25
    }
});