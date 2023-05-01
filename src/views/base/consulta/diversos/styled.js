
import styled from "styled-components";

export const  PageArea  = styled.div`

    .searchArea{
        width: 100%;
        display: flex;
        
      


            .inputSearch--1, .inputSearch--2,.inputSearch--3{
                width: 380px;
                margin-bottom: 20px;
                padding: 10px;
                outline: 0;

                
              }
              
              .inputSearch--1{
                margin-left: 5px;
              }
              .inputSearch--2{
                margin-left: 35px;
              }
              .inputSearch--3{
                margin-left: 35px;
              }



              .icon{
                position: absolute;
                margin-left: -35px;
                margin-top:12px;
                }

               
              

    }


    .titleRelat{
                    
        font-size:40px;
        font-weight: bold;
        font-family: arial;
        display: flex;
        justify-content: center;
        align-items: center;
    
} 

    @media(max-width: 600px){

        .searchArea{
            flex-direction: column;
            


                .inputSearch--1, .inputSearch--2, .inputSearch--3 {
                    width:98%;
                    margin-left:0;
                }
             
        }


    }

    @media(max-width: 700px){

        .searchArea{
            flex-direction: column;
            


                .inputSearch--1, .inputSearch--2, .inputSearch--3 {
                    width:98%;
                    margin-left:0;
                }
             
        }


    }

    @media(max-width: 800px){

        .searchArea{
            flex-direction: row;
            


                .inputSearch--1, .inputSearch--2, .inputSearch--3 {
                    width:98%;
                    margin-left:0;
                }
             
        }


    }
   
    @media print {
        form {
            display: none;
        }
        .button{
            display: none;
        }
        @page {
            margin: 0;
            size: auto;
          }
         
    }

`