import React from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { useTranslation } from "react-i18next";

import Score from "../utils/score";
import { RootState } from "../reducers";

const HistoryTable: React.FC = () => {
  const { t } = useTranslation();
  const scores = useSelector((state: RootState) => state.scores);
  const current = useSelector((state: RootState) => state.current);
  const labels = useSelector((state: RootState) => state.labels);

  const header = _.range(0, scores.length).map((i) => (
    <th key={i}>
      {t("historyTable.team")} {i + 1}
    </th>
  ));
  header.push(<th key="current">{t("historyTable.current")}</th>);
  const allScores = [...scores, current];
  const rows = _.range(0, allScores[0].length).map((i) =>
    allScores.map((score, j) => (
      <td key={`score${j}${i}`}>{score[i].value}</td>
    )),
  );
  const rowDivs = rows
    ? rows.map((row, i) => (
        <tr key={i}>
          <th>{labels.labels[i]}</th>
          {row}
        </tr>
      ))
    : labels.labels.map((label, i) => (
        <tr key={i}>
          <th>{label}</th>
        </tr>
      ));
  const totals = allScores.map((team, i) => (
    <td key={`total${i}`}>
      <em>{Score.calcTotal(team)}</em>
    </td>
  ));
  const standings = allScores.map((team, i) => (
    <td key={`standing${i}`}>
      <strong>{Score.getStanding(allScores, team)}</strong>
    </td>
  ));

  return (
    <div className="table-responsive">
      <table className="table table-sm table-nonfluid">
        <thead>
          <tr>
            <th>{t("historyTable.categoryTeam")}</th>
            {header}
          </tr>
        </thead>
        <tbody>
          {rowDivs}
          <tr>
            <th>{t("historyTable.finalScore")}</th>
            {totals}
          </tr>
          <tr>
            <th>{t("historyTable.standings")}</th>
            {standings}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
