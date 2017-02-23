# Book.next

A web app for managing your personal reading lists. Users should create an account if they do not already have one, and then go to the "Explore Books" screen to find books they would like to read. If the book they are looking for does not exist, they can add it to the database. Once they have a reading list, users can mark each book as unread, started, or read, or they can remove books from the list.

Interacts with an API at [this gitHub repository](https://github.com/Sofistication/reading-list-api).

## User Stories

- [x] As a user, I want to have an account so that I can track my reading list and keep it private.
- [x] As a user, I would like to be able to explore books so that I can add them to my personal reading list.
- [x] As a user, I would like to be able to mark books as read, in progress, and unstarted so that I can keep track of my progress through my list.
- [x] As a user, I would like to be able to explore books by author, title, so that I can further explore authors I previously enjoyed.
- [ ] As a user, I would like to have multiple reading lists, so that I can sepearate my readings into broad categories.
- [ ] As a user, I would like to be able to determine an order for my reading lists, so that I can make sure I am reading books that build on each other in a beneficial order.
- [ ] As a user, I would like to be able to rate or describe books I have read, so that I can remember what I enjoyed and what I disliked.
- [ ] As an administrator, I would like users to add new books to the database from an external source, so I can ensure accuracy of information.

## Wireframes

![Current Wireframe](IMG_20170221_102913.jpg)

## Design Approach

In designing this app, I began by creating the most basic version of the API, and then began to code the client. As the needs of the client surpassed the capabilities of the API, I went back and added in the necessary functionality.

## Technologies

The majority of the client-side app is written using JavaScript, and relying heavily on [jQuery](http://jquery.com/) and [handlebars](http://handlebarsjs.com/) to render json being returned by the api. A particularly useful technology has been the recent implementation of promises into jQuery, which allowed for relatively painless handling of asynchronicity.

The server is a Rails API whose documentation is linked above. Authenticated users are able to view a list of books, or search the list by title, author or a combination of the two. Users can add books if they do not exist, and once they have found the book they can add them to their reading list. When viewing their list, users can mark books with a status of unread, started, or read.

## Bragging section

There are a couple of pieces of code which do things not explicitly covered in the lessons on rails which I wish to highlight.

The first is in the `create` action of the `ReadingsController`. THis piece of code checks if the user has already added the book in question to their list, which in terms of the database structure means whether an entry in the reading table with the user_id and book_id already exists:
```ruby
# POST /readings
def create
  @reading = current_user.readings.build(reading_params)

  if Reading.exists?(user_id: current_user.id,
                     book_id: reading_params[:book_id])
    head :conflict
  elsif @reading.save
    render json: @reading, status: :created
  else
    render json: @reading.errors, status: :unprocessable_entity
  end
end
```
The second such piece of code is the implementation of searching by title and author. First, a private method for searchable parameters is defined:
```ruby
def search_params
  params.permit(:title, :author)
end
private :search_params
```
whose presence is then checked by the index controller when it is called:
```ruby
# GET /books
def index
  @books = if search_params
             Book.where(search_params).order(author: :asc)
           else
             Book.all.order(author: :asc)
           end

  render json: @books
end
```
Also visible here is an implementation of a consistent order of return for books: they will always be returned alphabetically by author.

## Tests

There are a number of rspec tests written for the API repository. Due to changes to resource ownership and databse structure, these tests may not be passing any more, as they were written based on an earlier version of the API in which users owned books directly. However, these tests did work when they were written, and [are scheduled to be fixed](https://github.com/Sofistication/reading-list-api/issues/19) though time constraints for project presentation have prevented this before now.
