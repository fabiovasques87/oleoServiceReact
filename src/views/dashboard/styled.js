
import styled from "styled-components";

export const  PageArea  = styled.div`

    .searchArea{
        width: 100%;
        display: flex;
        
       


            .inputSearch--1, .inputSearch--2,.inputSearch--3{
                width: 400px;
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

    @media(max-width: 1000px){

     
            .searchArea{
                display: none;
            }
        


    }

  
   

`