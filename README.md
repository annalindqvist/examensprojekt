# Examensprojekt 2023

*Start: Måndag 17/4-2023*
*Redovisning: Tisdag 30/5-2023*

---

## Beskrivning
Jag ska skapa en social-media applikation för att uttöka sin bekantskap men enbart för kvinnor. Via denna applikation kan man registrera sig för att därmed få tillgång till innehållet. Väl inloggad har man en egen profil där man kan presentera sig själv. Det finns ett publikt flöde där man kan dela publika inlägg samt kommentera eller gilla andras delade inlägg. Detta flöde av syftet för att lättare kunna interagera med andra medlemmar. Du har även möjlighet att lista alla registrerade användare för att kunna läsa mer om de samt kunna spara och chatta med varandra. 

Main branchen ligger på linodeserver just nu: http://143-42-49-241.ip.linodeusercontent.com/. Finns vissa små-fel som är ändrade i devbranchen (lokalt) men som inte finns på linode. Bland annat att om ett konto tas bort tas även notifikationerna bort som är skapade av den användaren.

## Tekniker och programspråk
- React
- Node.js
- Express
- MongoDB
- Socket.io
- (Kanske något för mejlhantering, återkommer inom kort om val)

## Kravspecifikation
- [x] Kopplad till en databas
- [x] Finnas på en server
- En användare ska kunna: 
  - [x] registrera sig / logga in / logga ut
  - [x] uppdatera sin information (inloggningsuppgifter & profil)
  - [x] ha en profil med (ålder, stad, profilbild, beskrivning, intressen)
  - [x] spara användare / ta bort sparad användare
  - [x] chatta med sparade användare
  - [x] dela publika inlägg / ta bort inlägg man delat
  - [x] gilla publika inlägg / avgilla inlägg man gillat
  - [x] kommentera publika inlägg / ta bort kommentar man skapat
  - [x] filtrera listvyn över användare (på stad)


## Utmaningar utöver kravspecifikationen
- [x] Chatnotifikationer
- [x] Notifikationer om någon gillar eller kommenterar inägg samt om någon sparar ens profil
- [x] Chatta med en användare som ej är sparad
- Tagga en användare i ett publikt inlägg
- Tagga en användare i en kommentar på ett publikt inlägg
- Gruppchatter
- Mejl-funktionallitet (glömt lösenord bland annat)
- Hantera emojis
- Se när en användare skriver i chatten
- Skicka bilder i chatten
- Se när en användare läst i chatten
- [x] En logotyp - enbart namn som logga
- Dark/light-mode

---

# För att starta projektet lokalt 

1. Gå in i dev-branchen
2. Clona ner repot
3. Gå in i mappen 'examensprojekt' för att komma in i projektet
4. Gå in i backend mappen och skriv npm install
5. Skapa .env fil med innehållet som finns i .env-example filen och fyll i den (porten ska vara 8080, annars behövs alla länkar i frontend ändras till rätt port)
6. Skriv npm start för att starta backend
7. Gå in i frontend mappen och skriv npm install
8. Skriv npm start för att starta projektet
9. Frontend körs på port 3000 och backend på port 8080

