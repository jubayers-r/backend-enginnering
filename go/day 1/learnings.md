# Hello world on GO

```go
package main
//must package in every go file

import "fmt"
// fmt => format; its go's default package for  builtin functions made by makes of go

func main(){
    // this main package came from the first line (must line for every go program just like C language)

    fmt.Println("Hello Go")
    //using do's default package fmt to get Println function
	// println => here ln means \n in antother languages which make us go to the next line automatically

}
```


# variables and data types

```go
<<<<<<< HEAD
package main

import "fmt"

var c, python, java bool
var i, j int = 1, 2

func main(){

/*
int, int8, int32, int64
uint8, uint16, uint32, uint64
float32, float64
bool
string
*/
var i int

fmt.Println(i, c, python, java) //output: 0 false false false


    // var a int = 10
    // var a = 10 // same as a:=10
     a:= 10 //it assigns the type implicitly
     a = 20
    // a = "habib" //cannot be declared different way than the first one

    // const b string = "bruh"
    const b  = "bruh"
    // b = "habub" //constant cannot be redeclared


    fmt.Println(b)
    fmt.Println(a)




}
```


# if else switch cases

```go
package main
import "fmt"

func main(){

    a:= 2
    age:= 18
    gender:= "male"

    if (age >= 20 || gender == "male") {
        //go only has ==(equals) != (not equals) as it has strict type checking on its own unlike js
        fmt.Println("You eligible to fight ")
    } else {
        fmt.Println(" You are not eligible to fight")
    }



    switch a {
    case 1:
        fmt.Println("a is 1")
    case 2, 3:
        fmt.Println("case is either 2 or 3")
    }
}

```


=======

```
>>>>>>> 030ffe9e4d638b9ef39d874f1765ee799ef0df56
