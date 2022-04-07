import { useState } from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { Input } from "../../../components/Input"
import { Book } from "../../../models/Book"
import { BookService } from "../../../services/BookService"

interface BookFormProps {
    data?: Book | Partial<Book>
    onSuccess?: () => void
}

export const BookForm = (props: BookFormProps) => {
    const [data, setData] = useState<Partial<Book>>(props.data || {})
    const [formErrors, setErrors] = useState({})

    const saveBook = async () => {
        // clear errors
        setErrors({})

        // validation
        const errors = {}
        if (!data.name || !data.name.trim()) {
            errors['name'] = 'Name is required'
        }
        if (!data.author || !data.author.trim()) {
            errors['author'] = 'Author is required'
        }
        if (!data.description || !data.description.trim()) {
            errors['description'] = 'Description is required'
        }
        if (!data.publisher || !data.publisher.trim()) {
            errors['publisher'] = 'Publisher is required'
        }

        // has errors
        if (Object.keys(errors).length) {
            setErrors(errors)
            return
        }

        // if has id is update
        if (data.id) {
            const book = new Book(data)
            const result = await BookService.update(book)
        } else {
            // is create
            const obj = new Book(data)
            const book = await BookService.create(obj)
            setData(book)
        }

        // callback
        props.onSuccess && props.onSuccess()
    }

    return <View style={styles.container}>
        <Text style={styles.title}>{data.id ? 'Edit book' : 'Add new book'}</Text>

        <Input
            label="Name"
            placeholder="Enter the name"
            defaultValue={data.name}
            onChangeText={val => setData({ ...data, name: val })}
            error={formErrors['name']}
        />
        <Input
            label="Description"
            placeholder="Enter the description"
            defaultValue={data.description}
            onChangeText={val => setData({ ...data, description: val })}
            error={formErrors['description']}
        />
        <Input
            label="Author"
            placeholder="Enter the author name"
            defaultValue={data.author}
            onChangeText={val => setData({ ...data, author: val })}
            error={formErrors['author']}
        />
        <Input
            label="Publisher"
            placeholder="Enter the publisher"
            defaultValue={data.publisher}
            onChangeText={val => setData({ ...data, publisher: val })}
            error={formErrors['publisher']}
        />

        <Button title="Save" onPress={saveBook} />
    </View>
}


const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    title: {
        fontSize: 20,
        marginBottom: 14
    }
})
