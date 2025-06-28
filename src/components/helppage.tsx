import React from "react";
import { useTranslation } from "react-i18next";
import { marked } from "marked";
import DOMPurify from "dompurify";

const HelpPage = () => {
  const { t } = useTranslation();
  const helpText = `
${t("helpPage.dantaiHokei.title")}
------------

**${t("helpPage.dantaiHokei.points1.title")}**

${t("helpPage.dantaiHokei.points1.description")}

**${t("helpPage.dantaiHokei.points2.title")}**

${t("helpPage.dantaiHokei.points2.description")}

**${t("helpPage.dantaiHokei.points3.title")}**

${t("helpPage.dantaiHokei.points3.description")}

**${t("helpPage.dantaiHokei.points4.title")}**

${t("helpPage.dantaiHokei.points4.description")}

**${t("helpPage.dantaiHokei.points5.title")}**

${t("helpPage.dantaiHokei.points5.description")}

${t("helpPage.tenkai.title")}
------

**${t("helpPage.tenkai.points1.title")}**

${t("helpPage.tenkai.points1.description")}

**${t("helpPage.tenkai.points2.title")}**

${t("helpPage.tenkai.points2.description")}

**${t("helpPage.tenkai.points3.title")}**

${t("helpPage.tenkai.points3.description")}

**${t("helpPage.tenkai.points4.title")}**

${t("helpPage.tenkai.points4.description")}

**${t("helpPage.tenkai.points5.title")}**

${t("helpPage.tenkai.points5.description")}
`;
  return (
    <div
      className="helptext"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(helpText)) }}
    />
  );
};

export default HelpPage;
