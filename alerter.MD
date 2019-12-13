```
<div class="info">
  <i class="fa fa-question-circle"></i> 
    Click to select/unselect characters/tabs. Shift+Click will refresh them from the server.
</div>

.info
fa fa-question-circle
.warn
fa fa-exclamation-triangle
.error
fa fa-exclamation-circle

&f06a

dodaj do:

.fa {
    font-size: 1.5em;vertical-align: middle;margin-right: 4px;
}


#alerter .info {
  background: #10d618;
  color: black;
  border-left: 5px solid white;
  font-weight: bold;
  margin: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  padding-top: 2px;
  padding-top: 3px;
  padding-bottom: 2px;
  padding-left: 10px;
  /* padding-right: 10px; */

  border: 1px solid #15d815;
  border-radius: 6px

}

teraz tylko wrzucic wszystko do .info .warn .error


#alerter {
  width: max-content;
  margin: 0 auto;
  margin-bottom: 1em;
  border-radius: 6px;

}
```


<<<<<<< Updated upstream
wyciagnac rzecz wspolna i wstawic do selektora #alerter
```
=======






>>>>>>> Stashed changes
#alerter .warn {
  background: #ffff00;
  color: black;
  font-weight: bold;
  margin: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  //add
  border: 1px solid #ffff00;
  border-radius: 6px;
  padding-top: 3px;
  padding-bottom: 2px;
  padding-left: 10px;
  padding-right: 10px;
}


#alerter .error {
  background: red;
  //zostawic
  color: white;
  font-weight: bold;
  margin: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  /add
    border: 1px solid #ffff00;
  border-radius: 6px;
  padding-top: 3px;
  padding-bottom: 2px;
  padding-left: 10px;
  text-decoration: underline;
  padding-right: 10px;
}



#alerter a,
#alerter a:visited {
  color: #ff2d6f;
  text-decoration: none;
}

#alerter .warn a:hover {
  color: pink;
}

#alerter .error {
  background: red;
  color: white;
  font-weight: bold;
  margin: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
```
