package com.example.weboblig3;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;


@RestController
public class BillettController {

    @Autowired
    BillettRepository rep;

    /*public final List<Billett> billettRegister = new ArrayList<>();*/

    @PostMapping("/kjopBillett")
    public void kjopBillett(Billett billett){
        rep.lagreBillet(billett);
    }

    @GetMapping("/hentAlleBilletter")
    public List<Billett> hentAlleBilletter(){
        return rep.hentAlleBilletter();
    }

    @GetMapping("/slettAlleBilletter")
    public void slettAlleBilletter(){
        rep.slettAlleBilletter();
    }
}
