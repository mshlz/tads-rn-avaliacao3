import { Database } from "../db/Database"
import { Book } from "../models/Book"

export class BookService {
    static readonly TABLE = `book`

    static async create(obj: Book) {
        const result = await Database.runQuery(`INSERT INTO ${this.TABLE} (name, author, description, publisher) VALUES (?,?,?,?)`, [
            obj.name.trim(),
            obj.author.trim(),
            obj.description.trim(),
            obj.publisher.trim()
        ])

        obj.id = result.insertId

        return obj
    }

    static async update(obj: Book) {
        const query = `UPDATE ${this.TABLE} SET name = ?, author = ?, description = ?, publisher = ? WHERE id = ?;`
        const result = await Database.runQuery(query, [
            obj.name.trim(),
            obj.author.trim(),
            obj.description.trim(),
            obj.publisher.trim(),
            obj.id
        ])

        return result.rowsAffected > 0
    }

    static async delete(obj: Book) {
        const query = `DELETE FROM ${this.TABLE} WHERE id = ?;`
        const result = await Database.runQuery(query, [
            obj.id
        ])

        return result.rowsAffected > 0
    }

    static async deleteById(id: number) {
        const query = `DELETE FROM ${this.TABLE} WHERE id = ?;`
        const result = await Database.runQuery(query, [id])

        return result.rowsAffected > 0
    }

    static async findById(id: number) {
        const query = `SELECT * FROM ${this.TABLE} WHERE id = ?;`
        const result = await Database.runQuery(query, [id])

        if (result.rows.length != 1) {
            throw new Error('Book not found')
        }

        const raw = result.rows.item(0)
        const obj = new Book(raw)

        return obj
    }

    static async findAll() {
        const query = `SELECT * FROM ${this.TABLE};`
        const result = await Database.runQuery(query)

        return result.rows._array.map(row => new Book(row))
    }

}