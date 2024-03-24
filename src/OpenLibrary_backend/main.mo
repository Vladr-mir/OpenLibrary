import Nat32 "mo:base/Nat32";
import Trie "mo:base/Trie";
import Option "mo:base/Option";
import List "mo:base/List";

actor {
  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };
};
