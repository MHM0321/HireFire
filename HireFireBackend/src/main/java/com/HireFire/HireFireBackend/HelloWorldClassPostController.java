package com.HireFire.HireFireBackend;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldClassPostController
{
    //gets info through post instead of GET
    //(we use postman api to test it now, cuz using main url to test is considered gay)
    @PostMapping("/mhmHelloWorldPost")
    public HelloWorldClass HelloWorldFunPost()
    {
        //an object of HelloWorldClass
        return new HelloWorldClass(1, "Whatever you want in post");
    }
}