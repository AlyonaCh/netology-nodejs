запрос(ы) для вставки данных минимум о двух книгах в коллекцию books
try {
   db.products.insertMany( [
        {
            title: "string",
            description: "string",
            authors: "string"
        },
        {
            title: "string",
            description: "string",
            authors: "string"
        },
        {
            title: "string",
            description: "string",
            authors: "string"
        }
   ] );
} catch (e) {
   print (e);
}
запрос для поиска полей документов коллекции books по полю title
db.collection.find( { title: { $gt: "string" } } )
запрос для редактирования полей: description и authors коллекции books по _id записи
try {
   db.restaurant.updateOne(
      { _id : 1 },
      { $set: { "description" : "3", "authors" : "3" } }
   );
} catch (e) {
   print(e);
}