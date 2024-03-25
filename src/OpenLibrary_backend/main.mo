// import Nat32 "mo:base/Nat32";
// import Trie "mo:base/Trie";
// import Option "mo:base/Option";
// import List "mo:base/List";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Map "mo:base/HashMap";
import Iter "mo:base/Iter";

// Define the actor
actor Assistant{
  type Book = {
    title: Text;
    description: Text;
    read: Bool;
  };

  func natHash(n : Nat) : Hash.Hash {
    Text.hash(Nat.toText(n))
  };

  var books = Map.HashMap<Nat, Book>(0, Nat.equal, natHash);
  var nextId : Nat = 0;

  public query func getBooks() : async [Book] {
    Iter.toArray(books.vals());
  };

  public func AddBook(title: Text, description : Text) : async Nat {
    let id = nextId;
    books.put(id, { title = title; description = description; read = false });
    nextId += 1;
    id
  };

  public func completeReading(id : Nat) : async () {
    ignore do ? {
      let description = books.get(id)!.description;
      let title = books.get(id)!.title;
      books.put(id, {title; description; read = true});
    }
  };

  public query func showBooks() : async Text {
    var output : Text = "\n___Books___";
    for (book : Book in books.vals()) {
      output #= "\n" # book.title;
      output #= "\n" # book.description;
      if (book.read) { output #= "X" }
    };
    output # "\n"
  };
};
