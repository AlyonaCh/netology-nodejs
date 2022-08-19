запрос(ы) для вставки данных минимум о двух книгах в коллекцию books<br/>
try {<br/>
   db.products.insertMany( [<br/>
        {<br/>
            title: "string",<br/>
            description: "string",<br/>
            authors: "string"<br/>
        },<br/>
        {<br/>
            title: "string",<br/>
            description: "string",<br/>
            authors: "string"<br/>
        },<br/>
        {<br/>
            title: "string",<br/>
            description: "string",<br/>
            authors: "string"<br/>
        }<br/>
   ] );<br/>
} catch (e) {<br/>
   print (e);<br/>
}<br/>
запрос для поиска полей документов коллекции books по полю title<br/>
db.collection.find( { title: { $gt: "string" } } )<br/>
запрос для редактирования полей: description и authors коллекции books по _id записи<br/>
try {<br/>
   db.restaurant.updateOne(<br/>
      { _id : 1 },<br/>
      { $set: { "description" : "3", "authors" : "3" } }<br/>
   );<br/>
} catch (e) {<br/>
   print(e);<br/>
}