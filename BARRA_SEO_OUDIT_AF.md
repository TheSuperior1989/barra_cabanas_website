# Barra Cabanas — Webwerf Oudit

**Tegniese hersiening van spoed en Google-sigbaarheid**

| | |
|---|---|
| **Webwerf** | barracabanas.com |
| **Opgestel deur** | SkillAxis Dynamics |
| **Datum** | 29 Augustus 2026 |
| **Metode** | Direkte inspeksie van die bronkode en die gepubliseerde bou |

---

## Opsomming

Die KI-assessering is in die regte rigting, maar dit het die verkeerde eksamen nagesien. Dit het die webwerf se **woorde** gepunt. Die webwerf se werklike probleem is sy **gewig**.

Elke gevolgtrekking hieronder kom uit metings van die werklike kode en die werklike gepubliseerde webwerf — nie uit 'n KI se indruk van die webwerf nie. Wat die SEO-punte betref, was die assessering oor die algemeen billik en op twee plekke selfs te vrygewig. Maar dit het die bevinding wat alles anders oorheers heeltemal misgeloop:

> **Die gepubliseerde webwerf is 612 MB groot, en die galery-bladsy alleen vra 'n besoeker se selfoon om ongeveer 293 MB se foto's af te laai.**

Hierdie enkele feit verklaar die stadige laaityd wat reeds opgemerk is, en dit is terselfdertyd 'n direkte Google-ranglysfaktor. Dit is herstelbaar, en om dit reg te maak is die waardevolste werk wat tans op hierdie webwerf gedoen kan word.

---

## 1. Die KI-punte, reël vir reël nagegaan

Elke area is hertoets teen die bronkode en die produksiebou. Waar die oorspronklike punt staan, word dit bevestig. Waar dit nie staan nie, word die reggestelde punt en die rede gegee.

| Area | KI-punt | Geverifieer | Wat die kode werklik wys |
|---|---|---|---|
| Google kan die werf vind/indekseer | 8/10 | **5/10** | Te vrygewig. Die werf is gebou as 'n JavaScript-toepassing wat 'n leë bladsy stuur en die inhoud eers daarna teken. Daar is geen `sitemap.xml` en geen `robots.txt` nie. Google kan hiermee werk, maar indekseer sulke werwe stadiger en minder betroubaar. |
| Handelsmerksoektog — "Barra Cabanas" | 8/10 | **8/10** | Billik. Die naam is in die bladsytitel, die domein en die geo-etikette. Iemand wat die naam met die hand soek, sal die werf kry. |
| Algemene SEO | 5/10 | **3/10** | Te vrygewig. Al agt bladsye deel een identiese titel en een identiese beskrywing. In Google se resultate is die galery, die kontakbladsy en die besprekingsbladsy nie van die tuisblad te onderskei nie. |
| Akkommodasie-sleutelwoorde | 3/10 | **3/10** | Korrek, en die rede is konkreet: die akkommodasie-aanbod lê by die adres `/services` onder een generiese blok met die opskrif "Luxury Beachfront Holiday House". Niemand soek na "services" nie. |
| Plaaslike SEO | 5/10 | **4/10** | Breedte- en lengtegraad-etikette is teenwoordig, maar dit is 'n verouderde formaat wat Google nie meer vir ranglyste gebruik nie. Die moderne ekwivalent — gestruktureerde besigheidsdata — ontbreek heeltemal. |
| Inhoudsdiepte | 3/10 | **3/10** | Korrek. Let veral op: 'n Oor Ons-bladsy en 'n Blog-bladsy is reeds gebou en lê ongebruik in die kode — hulle is nooit aan die werf se navigasie gekoppel nie. |
| Omskakeling / besprekings-SEO | 5/10 | **5/10** | Billik. Die navraag- en kwotasievloei werk en is bereikbaar vanaf die hero. Hulle is bloot onsigbaar vir soektogte op hul eie meriete. |
| Mededingende sigbaarheid | 4/10 | **nie verifieerbaar** | Dit kan nie uit die kode gepunt word nie. Dit verg lewendige ranglysdata. Sien die beperkings-afdeling. |
| **Werfspoed en bladsygewig** | *nie gepunt* | **1/10** | Die ontbrekende reël — en die belangrikste een. Hieronder gemeet. |

---

## 2. Die bevinding wat die assessering misgeloop het

Google gebruik bladsyspoed al jare lank as 'n ranglysfaktor, en weeg dit swaar op mobiel — presies hoe die meeste vakansie-akkommodasie deesdae gesoek word. Dit is metings uit die gepubliseerde bou.

| Meting | Waarde |
|---|---|
| Totale gepubliseerde werf | **612 MB** |
| Galery-bladsy, een besoek | **293 MB** |
| Outo-spelende hero-video | **62 MB** |
| Ongebruikte lêers wat steeds gestuur word | **192 MB** |
| Volgrootte galeryfoto's, almal gelyktydig gelaai | **46** |
| Beelde in 'n moderne webformaat | **0** |

### KRITIEK — Die galery laai 46 drukgehalte-foto's gelyktydig

Die galery vertoon elke foto teen volle oorspronklike resolusie, sonder klein voorskou-weergawes en sonder enige opdrag om hulle eers te laai soos die besoeker blaai. Om daardie bladsy oop te maak begin 46 aflaaie op een slag. Op 'n selfoon is dit die verskil tussen 'n bladsy wat onmiddellik verskyn en een wat minute lank vashaak — en dit is presies die stadigheid wat reeds opgemerk is.

Om die resolusie in perspektief te stel: een galerybeeld is 'n 33-megapixel kamera-uitvoer van 4672 × 7008 pixels, vertoon binne 'n roosterblokkie van 'n paar honderd pixels wyd. Die besoeker laai ongeveer 150 keer meer beeld af as wat sy skerm kan wys.

```
Grootste galerybeeld    21,4 MB   (4672 x 7008 px, Sony A7 IV-uitvoer)
Galery-totaal            293 MB   oor 46 beelde
Stadige laai toegepas    3 van 43 beelde werfwyd
Moderne formate          0 van 318 beelde (almal JPEG)
```

### KRITIEK — 'n 62 MB-video speel outomaties by elke besoek, ook op mobiel

Die tuisblad se hero stroom 'n 62 MB-video die oomblik as die bladsy oopmaak, op selfone sowel as rekenaars. Vir 'n besoeker op mobiele data is dit beide 'n stadige eerste indruk en 'n werklike koste vir hulle. So 'n hero-video behoort 'n breukdeel van daardie grootte te wees, met 'n stilfoto wat op mobiel inspring.

### HOOG — 192 MB se ongebruikte lêers word gepubliseer

Agt videolêers word saam met die werf gestuur; net een word ooit gebruik. Die oorblywende sewe — insluitend een enkele lêer van 94 MB — is voorraad- en konsepmateriaal wat van die ontwikkeling oorgebly het. Hulle dien geen doel nie en kan sonder meer verwyder word.

---

## 3. Wat aan die soekkant ontbreek

Dit is die konkrete gapings agter die SEO-punte. Elkeen is 'n standaard stuk opstelling wat eenvoudig afwesig is — nie 'n saak van mening of strategie nie.

### KRITIEK — Elke bladsy deel een titel en een beskrywing

Die titel en beskrywing wat Google in sy resultate wys, word een keer geskryf, in 'n enkele lêer, en op al agt bladsye toegepas. Die galery, die aktiwiteitsbladsy, die visvangbladsy en die besprekingsbladsy stel hulself almal aan Google voor as "Barra Cabanas – Luxury Beach Houses & Accommodation in Mozambique". Google het niks om hulle mee te onderskei nie, en het dus min rede om enigeen van hulle vir sy eie onderwerp te rangskik.

### HOOG — Geen sitemap, geen robots-lêer, geen gestruktureerde besigheidsdata

'n Sitemap sê vir Google watter bladsye bestaan; 'n robots-lêer sê waar om die sitemap te kry. Nie een is teenwoordig nie. Gestruktureerde besigheidsdata — die masjienleesbare rekord van 'n verblyfbesigheid, sy ligging, kontakbesonderhede en tariewe — ontbreek ook heeltemal. Daardie gestruktureerde data is wat Google se ryk akkommodasie-lyste voed, en is die grootste enkele hefboom op plaaslike en akkommodasie-soeksigbaarheid.

```
robots.txt              nie teenwoordig
sitemap.xml             nie teenwoordig
Gestruktureerde data    geen gevind (geen LodgingBusiness-rekord)
Kanonieke etikette      geen gevind
```

### HOOG — Gedeelde skakels wys geen voorskoubeeld

Die werf se sosiale voorskoubeeld word verskaf in 'n formaat — SVG — wat WhatsApp, Facebook en LinkedIn nie vertoon nie. Elke keer as die werf op WhatsApp gedeel word, sien die ontvanger 'n kaal skakel in plaas van 'n foto van die eiendom. Vir 'n besigheid waar mond-tot-mond deel navrae dryf, is dit 'n werklike en onmiddellike verlies, en dit is 'n vyf-minute-herstel.

### HOOG — Niks word gemeet nie

Daar is geen analitiese kode en geen Google Search Console-verifikasie op die werf nie. Dit beteken daar is tans geen rekord van hoeveel mense besoek, waarna hulle gesoek het, watter bladsye hulle verlaat, of in watter soektogte die werf reeds verskyn nie. Totdat dit in plek is, is enige bewering oor ranglyste — insluitend die KI s'n — raaiwerk, en kan geen verbetering bewys word nie.

---

## 4. Die plan

Vier fases, gerangskik volgens opbrengs op moeite. Fase 1 is die een wat verander wat besoekers ervaar, en behoort nie vir die res te wag nie.

### Fase 1 — Maak die werf vinnig *(hoogste impak)*

Suiwer tegniese werk sonder enige verandering aan hoe die werf lyk. Die foto's bly presies soos hulle nou vertoon — hulle word bloot behoorlik afgelewer.

- Verklein en herkodeer al 318 beelde na moderne webformate, teen sinvolle vertoongroottes, met 'n klein voorskou-weergawe vir elke galeryblokkie.
- Laai galerybeelde eers soos die besoeker daarheen blaai, en wys die volle resolusie eers wanneer een oopgemaak word.
- Herkodeer die hero-video na 'n web-gepaste grootte en vervang dit met 'n stilfoto op mobiel.
- Skrap die sewe ongebruikte videolêers.
- Verdeel die werf se kode sodat 'n besoeker aan die tuisblad nie meer die kode vir elke ander bladsy aflaai nie.

> **Verwagte uitkoms:** Werfgewig daal van 612 MB na 'n teiken onder 30 MB. Die galery gaan van 'n minute lange laai op mobiel na feitlik onmiddellik. Google se bladsyspoed-telling verbeter wesenlik, wat elke bladsy gelyktydig oplig.

### Fase 2 — Herstel die soekfondamente *(vinnige winste)*

Klein, goed-omskrewe regstellings wat die ooglopende hindernisse verwyder. Lae moeite, onmiddellike effek.

- Gee elke bladsy sy eie titel en beskrywing, geskryf rondom waarvoor daardie bladsy werklik bedoel is.
- Voeg 'n sitemap en 'n robots-lêer by sodat Google vertel word wat bestaan.
- Voeg gestruktureerde besigheidsdata by wat Barra Cabanas as 'n verblyfbesigheid beskryf — ligging, kontak, fasiliteite, tariewe.
- Vervang die sosiale voorskoubeeld met 'n werklike foto sodat gedeelde skakels die eiendom wys.
- Installeer analitiese kode en verifieer die werf in Google Search Console, sodat resultate meetbaar word.
- Herskryf die generiese beeldbeskrywings — al 46 galeryfoto's deel tans die enkele beskrywing "Barra Cabanas".

> **Verwagte uitkoms:** Elke bladsy word individueel vindbaar. Search Console begin die ranglysdata insamel wat die volgende fase van raaiwerk in besluite verander.

### Fase 3 — Bou die bladsye waarna die soektogte werklik soek *(struktureel)*

Dit is waarna die KI-assessering gereik het. Mense soek nie na "services" nie — hulle soek na 'n plek om te bly op 'n benoemde plek.

- Skuif die akkommodasie-aanbod van `/services` na 'n behoorlik benoemde akkommodasiebladsy, met 'n herleiding sodat niks breek nie.
- Gee elke huis sy eie bladsy met sy eie foto's, slaapreëlings, fasiliteite en tariewe.
- Koppel die Oor Ons-bladsy en die Blog-bladsy wat reeds gebou is en ongebruik lê.
- Skryf 'n werklike liggingsbladsy oor Barra, Tofo en Inhambane — hoe om daar te kom, die grenspos, wat die area bied.
- Herskryf opskrifte sodat hulle die ligging dra: "Gallery" word 'n opskrif wat Barra en Mosambiek noem.

> **Verwagte uitkoms:** Die werf kry werklike, spesifieke bladsye wat vir akkommodasie-soektogte in die area kan rangskik, in plaas van een generiese bladsy wat alles probeer dek.

### Fase 4 — Plaaslike teenwoordigheid en inhoud *(deurlopend)*

Werk wat oor maande saamstel eerder as wat dit op een slag land, en die punt waarop verbetering meetbaar eerder as aanvaar word.

- Eis en voltooi die Google Business Profile, en hou die werf se besonderhede identies daaraan.
- Publiseer gasgerigte artikels op die bestaande blog — visvangseisoene, die rit op, wat om te pak, wanneer om te besoek.
- Hersien Search Console maandeliks en teiken die soektogte waarvoor die werf reeds naby aan rangskikking is.

> **Verwagte uitkoms:** Bestendige groei in nie-handelsmerk soekverkeer — mense wat nie reeds die naam Barra Cabanas geken het nie.

---

## 5. Wat hierdie hersiening nie kon vasstel nie

Reguit gestel, sodat niks hier vir meer aangesien word as wat dit is nie. Hierdie oudit het die webwerf se kode en sy gepubliseerde bou gelees. Dit het nie vir Google navraag gedoen nie.

- **Werklike indeksdekking.** Hoeveel bladsye Google tans hou, is onbekend sonder Search Console-toegang, wat nog nie opgestel is nie.
- **Huidige ranglyste en mededingerposisies.** Die "mededingende sigbaarheid 4/10"-syfer in die oorspronklike assessering het geen verifieerbare basis nie. Nog 'n syfer wat hier aangebied word, sou ook nie. Dit word ongeveer vier weke ná Search Console geïnstalleer is, beantwoordbaar.
- **Google Business Profile-status.** Of 'n profiel bestaan en geëis is, kan nie uit die webwerf se kode bepaal word nie.
- **Werklike laaityd.** Die lêergroottes hierbo is gemeet en presies; die gevolglike bladsylaai-sekondes sal wissel volgens toestel en verbinding. 'n Formele spoedtoets behoort voor en ná Fase 1 gedoen te word sodat die verbetering gedokumenteer is.
- **Oor die KI-assessering in die algemeen.** Sy punte was aanneemlik en sy rigting was gesond, maar dit was indrukke eerder as metings — en daarom het die 612 MB-probleem wat onder alles lê, ongenoem gebly. Die syfers in hierdie verslag is metings.

---

*Barra Cabanas — Tegniese en Soeksigbaarheid-oudit · SkillAxis Dynamics · 29.08.2026*
