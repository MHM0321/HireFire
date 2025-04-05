package com.HireFire.HireFireBackend;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController //this tells java to use this to contact to http and return something
public class HelloWorldClassController
{
    //data members
    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();    //this will be a sort of static variable

    //this tells java to use GET function to take info
    // (GET takes info in the form of http://whateverWebsite.com?info=whateverInfoYouProvide)
    //basically ? at the end of website and then put your variable equal to it
    @GetMapping("/mhmHelloWorld")
    //a function of HelloWorldClass type
    public HelloWorldClass helloWorldFunc(@RequestParam(value = "name", defaultValue = "World") String name)
    {
        //in @RequestParam, it basically takes info ? form and put it in name, if no info the default used
        return new HelloWorldClass(counter.incrementAndGet(), String.format(template, name));
        //an object of HelloWorldClass is returned
    }
}