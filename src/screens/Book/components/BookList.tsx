import { Alert, AlertButton, Pressable, StyleSheet, Text, View } from "react-native"
import { Book } from "../../../models/Book"
import { BookService } from "../../../services/BookService"

interface BookListProps {
    books: Book[]
    onSelectBook?: (contact: Book) => void
    onDeleteBook?: () => void
}

export const BookList = (props: BookListProps) => {

    const deleteBook = (book: Book) => {
        const cancelBtn: AlertButton = { text: 'Cancel' }
        const deleteBtn: AlertButton = {
            text: 'Delete',
            onPress: () => {
                BookService.delete(book).then(() => {
                    props.onDeleteBook && props.onDeleteBook()
                })
            }
        }

        Alert.alert(`Delete book "${book.name}"`, 'This cannot be reversed!', [deleteBtn, cancelBtn])
    }

    const renderBook = (book: Book) => {
        return <View key={book.id}>
            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? '#f1f1f1' : 'transparent' }, styles.listItem]}
                onLongPress={() => deleteBook(book)}
                onPress={() => props.onSelectBook && props.onSelectBook(book)}
            >
                <Text>{book.id} - {book.name} - {book.author} - {book.publisher}</Text>
            </Pressable>
        </View>
    }

    return <View style={styles.container}>
        {props.books.map(renderBook)}
    </View>
}

const styles = StyleSheet.create({
    container: {},
    listItem: {
        padding: 10
    }
})