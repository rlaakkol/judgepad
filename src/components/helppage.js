import React from 'react'
import marked from 'marked'

const helpText = `
DANTAI HOKEI
------------

**1. Muodon säilyminen ja samanaikaisuus**

Tuomari tarkkailee, pysyykö alkuperäinen muoto ja liikkeiden samanaikaisuus koko hokein ajan

**2. Tekninen puhtaus**

Tuomari arvioi tekniikoiden, kamaen, katseen käytön, unsokun ja unshinin puhtautta

**3. Tekninen vaativuus**

Vaativuuspisteet tulevat automaattisesti:
- sen hokei 2 pistettä
- un hokei 3 pistettä
- hen hokei 4 pistettä
- nen, jinsei no hokei 5 pistettä
- ten, tensei, chisei no hokei 6 pistettä
- ten hokei yhden käden sokutenilla 7 pistettä
- senin, hen, nentai, ten hokei puolivoltilla eteen- tai taaksepäin 8 pistettä
- senin, hen, nentai, ten hokei kokovoltilla eteen, taakse tai perhosvoltilla 9 pistettä
- nentai, ten hokei kierteisellä voltilla 10 pistettä

Kaikkien joukkueen jäsenten pitää tehdä sama korkea tengi. Tengin puhtaudella ei ole merkitystä tässä kategoriassa. Epäonnistuneen tengin vähennykset huomioidaan teknisen puhtauden kategoriassa.

**4. Hengitys ja teho**

Tuomari arvioi hengitystä, kiaita, tehoa ja voimantuottoa sekä toteutuuko tekniikoissa hyökkäys ja puolustus

**5. Vaikutelma**

Tuomari arvioi toteutuuko valmius ja herännyt mieli, hitaat ja nopeat/vahvat ja heikot/laajat ja suppeat/heikot ja voimakkaat liikkeet sekä lopetus ja valppaus

TENKAI
------

**1. Tilan käyttö ja liikkeen jatkuvuus**

Tuomari tarkkailee tatamialueen käyttöä (pyritään käymään tenkain aikana kaikissa kulmissa ja keskellä), jos kuolee ensimmäisten joukossa ei sakoiteta jos ei ehdi kaikkiin kulmiin.

Tuomari tarkkailee liikkeen jatkuvuutta kombinoinnissa ja tuleeko liikkeitä eri tasoille alas-keskelle-ylös

**2. Tekninen puhtaus**

Tuomari arvioi tekniikoiden, kamaen, unsokun ja unshinin puhtautta

**3. Tekninen vaativuus**

Tuomari tarkkailee tekniikoiden ja unshinin vaativuutta, sekä tekniikoiden määrää (wakiyakuilla 2 kokonaista ja kuolemaan johtanut tekniikka omasta tekniikkaluokasta)

**4. Realistisuus**

Tuomari tarkkailee tehtyjen hyökkäysten etäisyyttä ja kohteen järkevyyttä

**5. Ratkaisutekniikan etäisyys ja ajoitus**

Tuomari arvioi ratkaisutekniikan etäisyyttä ja ajoitusta
`

const HelpPage = () => (
  <div
    className="helptext"
    dangerouslySetInnerHTML={{ __html: marked(helpText, { sanitize: true }) }}
  />
)

export default HelpPage
