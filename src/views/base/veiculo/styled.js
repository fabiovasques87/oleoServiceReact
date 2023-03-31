import styled from "styled-components";


export const FormArea = styled.div`



.mb-8{
    margin-bottom:10px;
}


.AreaForm{
    width:700px;
    height:300px;
    display:flex;
    flex-direction column;
    flex-wrap: wrap;
    padding:10px;
    background-color:red;
}

.errors-alert{
    color: red;

}

span{
    color:red;
    padding: 10px;
}

button{
    width:120px;
    padding:10px;
    border-radius:8px;
    margin-top:30px;
    background-color: rgba(5, 200, 138);
    color: #FFF;
    transition: background .5s;
    border: none;

    &:hover{
        background-color: rgba(116, 158, 137);
    }

}

@media(max-width: 600px){
 button{
    width: 100%;
 }   

 h1 {
    font-size-14px;
 }
}

`