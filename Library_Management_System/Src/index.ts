//Building a simple Library System to manage books and members of a library using OOP principles.

// Define a class to represent a book 
class Book {
    private id: number;
    public title: string;
    private author: string;
    private year: number;
    private available: boolean;
    // Constructor to initialize the book object
     constructor(id: number, title: string, author: string, year: number) {
        this.id = id;
        this. title = title;
        this.author = author;
        this.year = year;
        this.available = true; // By default, the book is available
     }
    // Method to display list of registered books
    displayDetails(): string {
        return `ID: ${this.id}, Title: ${this.title}, Author: ${this.author}, Year: ${this.year}`;
    }

    // Method to check if the book is available
    isAvailable(): boolean {
        return this.available;
    }
    // Method to borrow the book
    borrow(memberName: string): void{
        if (this.isAvailable()) {
            this.available = false; // Mark the book as borrowed
            console.log(`${memberName}, you have successfully borrowed "${this.title}" authored by ${this.author}.`);
        } else {
            console.log(`Sorry, ${memberName}, "${this.title}" is not available at the moment.`); 
        }
    }
    // Method to return the book
    return(memberName: string): void {
        this.available = true; // Mark the book as available
        console.log(`Thank you, ${memberName}, for returning "${this.title}" by ${this.author}.`);
    }
 }

//  Testing the Book class
const book1 = new Book(1, "The Library Management System", "Nyong Mercy", 2025);
const book2 = new Book(2, "The Book of OOP", "Coollove Brain", 2024);
// console.log(book1.displayDetails());
// console.log(book2.displayDetails());

// Check availability before borowing
// if (book1.isAvailable()) {
//     book1.borrow();
// } 
// else {
//     console.log(`"Sorry" ${book1.title} " is not available."`);
// }
// book1.borrow(); // Attempting to borrow again to test the availability check

// // borrow book 2
// if (book2.isAvailable()) {
//     book2.borrow();
// } 
// else {
//     console.log(`"Sorry" ${book2.title} " is not available."`);
// }
// testing the return method
// book1.return();
// book1.borrow(); // Attempting to borrow again after returning
// book2.return();

// Managing members and their borrowed books
// Defining a class to represent a registered member
class Member {
    private id: number;
    name: string;
    private email: string;
    private phone: string;
    private address: string;
    protected borrowedBooks: Book[] = []; //Array to store borrowed books
    protected returnedBooks: Book[] = []; // Array to store returned books

constructor(id: number, name: string, email: string, phone: string, address: string) {
//initializing the member objects
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone =phone;
    this.address = address;
    }
// Method to display registered member's details
displayDetails(): string {
    return `ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Address: ${this.address}`;
}
// Method to borrow a book
 borrowBook(book: Book): void {
    if (book.isAvailable()) {
        book.borrow(this.name); //Calls the borrow method of class book and pass the member's name
        this.borrowedBooks.push(book); // Adds the book to the borrowed books array
    } 
    }

// Method to return a book
 returnBook(book: Book): void {
    //Check if the book is in the borrowed list
     const index = this.borrowedBooks.indexOf(book); //this looks for the book position in the array and returns the index num like 0,1,2, etc. and if not found, it will return -1 instead.
         if (index !== -1) { //Checks if there is a position for this book in the borrowed books array
     
         this.borrowedBooks.splice(index, 1); //this.splice removes the borrowed book from the borrowed book array list
     
         book.return(this.name); // Calls the return method of the class book
         this.returnedBooks.push(book); // Adds the book to the returned books array
         } else {
        console.log(`"${book.title}". was not successfully borrowed by ${this.name}`); //this checks if the book is in the borrowed books array
    }
}
// Method to display borrowed books
displayBorrowedBooks(): void {
     if (this.borrowedBooks.length === 0) { //if the array borrowedBooks is empty (length === 0)
        console.log(`${this.name} has no borrowed books.`); //print this statement plus the member name 
     }else {
        console.log(`${this.name} has borrowed the following books:`); //it prints this statement with the list of books; if the member has borrowed books
        for (const book of this.borrowedBooks) { //A for loop that goes through each book in the boorrowedBooks array and tries to print ech book's details.
            console.log(book.displayDetails()); // calls the method book.displayDetails() and prints the details of the book
        }
    } 
}
// Method to display returned books
displayReturnedBooks(): void {
    if (this.returnedBooks.length === 0) {
        console.log(`${this.name} has no returned books.`);
    }else {
        console.log(`${this.name} has returned the following books:`);
        for (const book of this.returnedBooks) {
            console.log(book.displayDetails());
        }
    }
}
}

// Testing the Member class
const member1 = new Member (1, "Blessing Ade", "blessingade@gmail.com", "07037535005", "5 Southern view Estate, Lekki");
const member2 = new Member (2, "Omotola Idris", "tolaidris@gmail.com", "09153828235", "Lagos, Nigeria");
// console.log(member1.displayDetails());
// console.log(member2.displayDetails());
// Borrowing books
member1.borrowBook(book1);
member1.borrowBook(book2);
member2.borrowBook(book2);
// Displaying borrowed books
member1.displayBorrowedBooks();
member2.displayBorrowedBooks();
// Returning books
member1.returnBook(book1);
member1.returnBook(book2);
member2.borrowBook(book1);
// Displaying borrowed and returned books
member1.displayBorrowedBooks();
member2.displayBorrowedBooks();
member1.displayReturnedBooks();
member2.displayReturnedBooks();

//defining a Library class to manage the library system; handling the books and memebers collectively
class Library {
    books: Book[] = []; // Array to store books
    members: Member[] = []; // Array to store members
    //no need for constructor here, because we have already initialized the books and members arrays above
    
    // Method to add a book to the library
   addBook(book: Book): void {
        this.books.push(book); // Adds the book to the books array
        console.log(`"${book.title}" is successfully added to the library.`);
    }
    // Method to register a member in the library
    registerMember(member: Member): void {
        this.members.push(member); // Adds the member to the members array
        console.log(`${member.name} has been registered successfully in the library.`);
    }
    // Method to list all available books in the library
    listAvailableBooks(): void {
        console.log("List of all available books in the library:");
        for (const book of this.books) { //A for loop that goes through each book in the books array and tries to print each book's details.
            if (book.isAvailable()) { //Checks if the book is available
                console.log(book.displayDetails()); //Calls the method book.displayDetails() and prints the details of the book
            }
        }
    }
    // Method to list all registered members in the library
    listMembers(): void {
        console.log(`List of all registered members in the library:`);
        for (const member of this.members) { //A for loop that goes through each member in the members array and tries to print each member's details.}
                console.log(member.displayDetails()); //Calls the method member.displayDetails() and prints the details of the member
        }
    }
    }
// Testing the Library class
const library = new Library();
library.addBook(book1);
library.addBook(book2);
library.registerMember(member1);
library.registerMember(member2);
// Listing available books
library.listAvailableBooks();
// Listing registered members
library.listMembers();

//Defining a Librarian class who can manage books and members: add/remove books, register & deregister, mananage borrowing/returns  and their dates on behalf of the members.

class Librarian extends Member {
 //Constructor to initialize the librarian object
    constructor(id: number, name: string, email: string, phone: string, address: string) {
        super(id, name, email, phone, address); // Calls the constructor of the Member class
    }

    private logAction(action: string): void {
        const date = new Date(); //To get the current date and time
        console.log(`[${date.toLocaleString()}] ${action}`); //Logs the action with the current date and time in the system's local format.
    }
    //Method to add a book to the library
    addBookToLibrary(library: Library, book: Book): void {
        library.addBook(book); // Calls the addBook method of the Library class
        this.logAction(`Added book "${book.title}" to the library`); 
    }
    // Method to register a member in the library
    registerMemberInLibrary(library: Library, member: Member): void {
        library.registerMember(member); //Calls the registerMember method of the Library class
        this.logAction(`Registered member "${member.name}" in the library`);
    }
    //Method to remove a book from the library
    removeBookFromLibrary(library: Library, book: Book): void {
        const index = library.books.indexOf(book);
        if (index !== -1) {
            library.books.splice(index, 1);
            this.logAction(`Removed book "${book.title}" from the library`);
        } else {
            this.logAction(`Attempted to remove book "${book.title}" but it was not found in the library.`);
        }
    }
    //Method to deregister a member from the library
    deregisterMemberFromLibrary(library: Library, member: Member): void {
        const index = library.members.indexOf(member); 
        if (index !== -1) { //Checks if there is a position for this member in the members array
            library.members.splice(index, 1); //this.splice removes the member from the members array list
            this.logAction(`${member.name} was deregistered from the library by the librarian ${librarian.name}.`);
        } else {
            this.logAction(`I the librarian, ${librarian.name} Attempted to deregister member "${member.name}" but was not successful.`);
        }
    }
    //Method to manage borrowing and returning of books on behalf of members
    manageBorrowReturn(member: Member, book: Book, action: string): void {
        if (action === "borrow") {
            member.borrowBook(book); // Calls the borrowBook method of the Member class
        } else if (action === "return") {
            member.returnBook(book); // Calls the returnBook method of the Member class
            this.logAction(`"${book.title}" was returned by ${member.name}`);
        } else {
            this.logAction(`Invalid borrow/return action attempted by ${member.name}: "${action}".`);
            console.log("Invalid action. Please specify 'borrow' or 'return'.");
        }
    }
}
//Testing the Librarian class
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
librarian.manageBorrowReturn(member2, book1, "invalidAction"); // Testing invalid action
// Displaying available books and registered members after librarian actions
library.listAvailableBooks();
library.listMembers();



