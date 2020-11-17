import React from 'react'
import fire from "../Fire"


function Cart(){

    const [names, setNames]=React.useState([]);
    const [name , setName]=React.useState({

        name: "",
        price:"",
        stock:"",

    });

    const [submit, setSubmit]=React.useState(false);
    const db = fire.firestore();

    React.useEffect(()=>{

        let newItems = [];

        db.collection("Cart").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                const object = doc.data();

                let item ={
                    name: object.name,
                    price:object.price,
                    stock:object.stock,
                    id:doc.id
                };

                newItems.push(item);

            });

            setNames(newItems);
        });

    },[db, submit]);

    const handleDelete = (id)=>{
        db.collection("Cart").doc(id).delete().then(()=>{
            setSubmit(!submit);
        })
    };

    const handleChange = prop => event =>{

        setName({
            ...name, [prop]: event.target.value
        });

    };



    const CoolPeopleEles = names.map((person, idx)=>
            <div key={idx}>

            <h1 onChange={handleChange("name")}>{person.name}</h1>
            <h2>Price: {person.price}</h2>
            <h3>Stock: {person.stock}</h3>
            <button onClick={()=>handleDelete(person.id)}>Delete Product</button>

    </div>
    );


    return (

        <div>
            {CoolPeopleEles}
        </div>
    )
}
export default Cart;
