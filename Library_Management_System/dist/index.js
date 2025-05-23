"use strict";
class Book {
    constructor(id, title, author, year) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.available = true;
    }
    displayDetails() {
        return `ID: ${this.id}, Title: ${this.title}, Author: ${this.author}, Year: ${this.year}`;
    }
    isAvailable() {
        return this.available;
    }
    borrow(memberName) {
        if (this.isAvailable()) {
            this.available = false;
            console.log(`${memberName}, you have successfully borrowed "${this.title}" authored by ${this.author}.`);
        }
        else {
            console.log(`Sorry, ${memberName}, "${this.title}" is not available at the moment.`);
        }
    }
    return(memberName) {
        this.available = true;
        console.log(`Thank you, ${memberName}, for returning "${this.title}" by ${this.author}.`);
    }
}
const book1 = new Book(1, "The Library Management System", "Nyong Mercy", 2025);
const book2 = new Book(2, "The Book of OOP", "Coollove Brain", 2024);
class Member {
    constructor(id, name, email, phone, address) {
        this.borrowedBooks = [];
        this.returnedBooks = [];
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }
    displayDetails() {
        return `ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Address: ${this.address}`;
    }
    borrowBook(book) {
        if (book.isAvailable()) {
            book.borrow(this.name);
            this.borrowedBooks.push(book);
        }
    }
    returnBook(book) {
        const index = this.borrowedBooks.indexOf(book);
        if (index !== -1) {
            this.borrowedBooks.splice(index, 1);
            book.return(this.name);
            this.returnedBooks.push(book);
        }
        else {
            console.log(`"${book.title}". was not successfully borrowed by ${this.name}`);
        }
    }
    displayBorrowedBooks() {
        if (this.borrowedBooks.length === 0) {
            console.log(`${this.name} has no borrowed books.`);
        }
        else {
            console.log(`${this.name} has borrowed the following books:`);
            for (const book of this.borrowedBooks) {
                console.log(book.displayDetails());
            }
        }
    }
    displayReturnedBooks() {
        if (this.returnedBooks.length === 0) {
            console.log(`${this.name} has no returned books.`);
        }
        else {
            console.log(`${this.name} has returned the following books:`);
            for (const book of this.returnedBooks) {
                console.log(book.displayDetails());
            }
        }
    }
}
const member1 = new Member(1, "Blessing Ade", "blessingade@gmail.com", "07037535005", "5 Southern view Estate, Lekki");
const member2 = new Member(2, "Omotola Idris", "tolaidris@gmail.com", "09153828235", "Lagos, Nigeria");
member1.borrowBook(book1);
member1.borrowBook(book2);
member2.borrowBook(book2);
member1.displayBorrowedBooks();
member2.displayBorrowedBooks();
member1.returnBook(book1);
member1.returnBook(book2);
member2.borrowBook(book1);
member1.displayBorrowedBooks();
member2.displayBorrowedBooks();
member1.displayReturnedBooks();
member2.displayReturnedBooks();
class Library {
    constructor() {
        this.books = [];
        this.members = [];
    }
    addBook(book) {
        this.books.push(book);
        console.log(`"${book.title}" is successfully added to the library.`);
    }
    registerMember(member) {
        this.members.push(member);
        console.log(`${member.name} has been registered successfully in the library.`);
    }
    listAvailableBooks() {
        console.log("List of all available books in the library:");
        for (const book of this.books) {
            if (book.isAvailable()) {
                console.log(book.displayDetails());
            }
        }
    }
    listMembers() {
        console.log(`List of all registered members in the library:`);
        for (const member of this.members) {
            console.log(member.displayDetails());
        }
    }
}
const library = new Library();
library.addBook(book1);
library.addBook(book2);
library.registerMember(member1);
library.registerMember(member2);
library.listAvailableBooks();
library.listMembers();
class Librarian extends Member {
    constructor(id, name, email, phone, address) {
        super(id, name, email, phone, address);
    }
    logAction(action) {
        const date = new Date();
        console.log(`[${date.toLocaleString()}] ${action}`);
    }
    addBookToLibrary(library, book) {
        library.addBook(book);
        this.logAction(`Added book "${book.title}" to the library`);
    }
    registerMemberInLibrary(library, member) {
        library.registerMember(member);
        this.logAction(`Registered member "${member.name}" in the library`);
    }
    removeBookFromLibrary(library, book) {
        const index = library.books.indexOf(book);
        if (index !== -1) {
            library.books.splice(index, 1);
            this.logAction(`Removed book "${book.title}" from the library`);
        }
        else {
            this.logAction(`Attempted to remove book "${book.title}" but it was not found in the library.`);
        }
    }
    deregisterMemberFromLibrary(library, member) {
        const index = library.members.indexOf(member);
        if (index !== -1) {
            library.members.splice(index, 1);
            this.logAction(`${member.name} was deregistered from the library by the librarian ${librarian.name}.`);
        }
        else {
            this.logAction(`I the librarian, ${librarian.name} Attempted to deregister member "${member.name}" but was not successful.`);
        }
    }
    manageBorrowReturn(member, book, action) {
        if (action === "borrow") {
            member.borrowBook(book);
        }
        else if (action === "return") {
            member.returnBook(book);
            this.logAction(`"${book.title}" was returned by ${member.name}`);
        }
        else {
            this.logAction(`Invalid borrow/return action attempted by ${member.name}: "${action}".`);
            console.log("Invalid action. Please specify 'borrow' or 'return'.");
        }
    }
}
const librarian = new Librarian(1, "Ifeyinwa Oju", "ifyoju@gmail.com", "08012345678", "Abuja, Nigeria");
librarian.addBookToLibrary(library, book1);
librarian.addBookToLibrary(library, book2);
librarian.registerMemberInLibrary(library, member1);
librarian.registerMemberInLibrary(library, member2);
librarian.removeBookFromLibrary(library, book1);
librarian.deregisterMemberFromLibrary(library, member1);
librarian.manageBorrowReturn(member1, book2, "borrow");
librarian.manageBorrowReturn(member1, book2, "return");
librarian.manageBorrowReturn(member2, book1, "borrow");
librarian.manageBorrowReturn(member2, book1, "return");
librarian.manageBorrowReturn(member2, book1, "invalidAction");
library.listAvailableBooks();
library.listMembers();
