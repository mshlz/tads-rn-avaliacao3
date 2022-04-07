export class Book {
    id: number
    name: string
    author: string
    description: string
    publisher: string
    
    constructor(obj?: Partial<Book>) {
        if (obj) {
            this.id = obj.id
            this.name = obj.name
            this.author = obj.author
            this.description = obj.description
            this.publisher = obj.publisher
        }
    }

    toString() {
        const fields = Object.values(this).join(', ')
        return `Book [${fields}]`
    }
}