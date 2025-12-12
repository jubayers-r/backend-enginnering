# scope

- global scope

- local scope

- block scope

- package scope (go specific)

```go
// go mod init jub(the name you want to use of using personal library)

package main

import "fmt"
import "jub/flib" //now you can import form your own library flib

func main(){
	fmt.Println("freak off")
	fmt.Println(flib.Add(1, 2))
}



```