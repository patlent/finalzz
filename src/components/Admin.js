import React from 'react'
import fire from "../Fire"


function Admin(){
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

    db.collection("Items").get().then(function(snapshot){

        snapshot.forEach(function(doc){

            const object = doc.data();

            let item ={
                name: object.name,
                price:object.price,
                stock:object.stock,
                image:object.image,
                id:doc.id
            };

            newItems.push(item);

        });

        setNames(newItems);

    });

},[db, submit]);



const handleChange = prop => event =>{

    setName({
        ...name, [prop]: event.target.value
    });

};

const handleSubmit = ()=>{

    if(name.name.length > 2) {

        db.collection("Items").add(name).then(() => {

            setName({

                name: "",
                price: "",
                stock: "",
            });

            setSubmit(!submit);

        })

    }else{
        alert("Character too short");
    }
};

// const handleDelete = (id)=>{
//     db.collection("products").doc(id).delete().then(()=>{
//         setSubmit(!submit);
//     })
// };



const CoolPeopleEles = names.map((product, idx)=>

    <div key={idx}>


    </div>
);


return(

    <div>
        <input type = "text" placeholder={"Name"} onChange={handleChange("name")}/>
        <input placeholder={"Price"} onChange={handleChange("price")}/>
        <input placeholder={"Stock"} onChange={handleChange("stock")}/>
        <button onClick={handleSubmit}>Submit</button>

        {CoolPeopleEles}
    </div>
)

}

export default Admin;
