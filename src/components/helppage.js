import React from 'react'
import marked from 'marked'

const helpText = `
DANTAI HOKEI
------------

**1. Formation preservation, synchronization**

The judge observes whether the original formation is preserved, and all movements are done in synchronization during the entire hokei.

**2. Technical purity**

The judge evaluates the technical purity of techniques, kamae, chakugan, unsoku and unshin.

**3. Technical difficulty**

The technical difficulty points are given automatically:
- sen hokei 2 points
- un hokei 3 points
- hen hokei 4 points
- nen, jinsei no hokei 5 points
- ten, tensei, chisei no hokei 6 points
- ten hokei with one-handed cardwheel 7 points
- senin, hen, nentai, ten hokei with handspring forward or backward 8 points
- senin, hen, nentai, ten hokei with somersault forward, backward or sideways 9 points
- nentai, ten hokei with twisted somersault 10 points

All team members must perform the same higher level tengi. The technical purity of the tengi is not evaluated in this category. The points deductions for failed tengi are taken into account in the technical purity category.

**4. Breathing and effectiveness**

The judge evaluates the breathing, kiai, effect and generation of power, and if attack and defense are realized in the techniques.

**5. Impression**

The judge evaluates if the readiness and clear mind, slow and fast/strong and weak/wide and compact movements, and the finish and alertness.

TENKAI
------

**1. Use of space and continuity of movement**

The judge evaluates the use of the tatami area (the aim is to visit all corners and the middle of the area during the tenkai), but if the competitor is the one of the first to be taken out their points are not deducted for not visiting all corners.

The judge evaluates the continuity of the movement in combinations and whether movements are performed for different levels (low – middle – high).

**2. Technical purity**

The judge evaluates the technical purity of techniques, kamae, unsoku and unshin.

**3. Technical difficulty**

The judge evaluates the technical difficulty of the techniques and unshin, as well as the number of techniques performed (for a wakiyaku, there must be a minimum of two complete techniques from their own class of techniques and the final technique that leads to the “death”)

**4. Realisticity**

The judge evaluates the distance of attacks and the rationality of the target.

**5. The distance and timing of the finishing technique**

The judge evaluates the distance and timing of the final, finishing technique.
`

const HelpPage = () => (
  <div
    className="helptext"
    dangerouslySetInnerHTML={{ __html: marked(helpText, { sanitize: true }) }}
  />
)

export default HelpPage
