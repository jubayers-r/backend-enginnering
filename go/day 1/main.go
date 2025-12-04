package main

import "fmt"

func main(){

/*
int, int8, int32, int64
uint8, uint32, uint64
float32, float64
bool
string
*/
    fmt.Println("Hello Go")

    // var a int = 10
    // var a = 10
     a:= 10
     a = 3
    // a = "habib" //cannot be declared different way than the first one

    // const b string = "bruh"
    const b  = "bruh"
    // b = "habub" //constant cannot be redeclared

    fmt.Println(b)
    fmt.Println(a)

    age:= 18
    gender:= "male"

    if (age >= 20 || gender == "male") {
        fmt.Println("You eligible to fight ")
    } else {
        fmt.Println(" You are not eligible to fight")
    }





}