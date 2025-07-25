import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import ScorePicker from "./scorepicker";
import SubmitButton from "./submit";
import Score from "../utils/score";
import { RootState } from "../reducers";
import * as Actions from "../actions";

const Scorecard: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rows = useSelector((state: RootState) => state.current);
  const history = useSelector((state: RootState) => state.scores);
  const labels = useSelector((state: RootState) => state.labels);
  const [isSaving, setIsSaving] = useState(false);

  const handleValueChange = (id: number, value: number) => {
    const newRows = rows.map((row) =>
      row.id === id ? { ...row, value } : row,
    );
    dispatch(Actions.updateCurrent(newRows));
  };

  const rowElements = rows.slice(0, 5).map((rowprops, i) => {
    const { key, ...rest } = rowprops;
    return (
      <ScorePicker
        key={key}
        {...rest}
        label={labels.labels[i]}
        handleValueChange={handleValueChange}
      />
    );
  });
  const extraRow = rows[5];
  const { key, ...rest } = extraRow;
  const extraPicker = (
    <ScorePicker
      key={key}
      {...rest}
      label={labels.labels[5]}
      handleValueChange={handleValueChange}
      isExtra
    />
  );
  const total = Score.calcTotal(rows);
  const standing = Score.getStanding(history, rows);
  const isTie = Score.isTie(history, rows);
  const warningSign = <i className="fa fa-warning" style={{ color: "red" }} />;
  return (
    <div className="d-flex flex-column h-100">
      <div className="px-3 py-3 flex-grow-1 overflow-auto">
        <div className="row">
          <div className="col-12">
            <strong>
              {t("scorecard.team")} {history.length + 1}
            </strong>
          </div>
        </div>
        <hr className="my-3" />
        {rowElements}
        {extraPicker}
        <hr className="my-3" />
        <div className="row equal">
          <div className="col-md-6">
            <strong>{t("scorecard.totalScore")}:</strong>{" "}
            {Math.round(total * 10) / 10}
          </div>
          <div className="col-md-6">
            <strong>{t("scorecard.currentStanding")}:</strong> {standing}{" "}
            {isTie && !isSaving ? warningSign : ""}
          </div>
        </div>
      </div>
      <div className="action-buttons px-3 py-3">
        <div className="row justify-content-center mt-2">
          <div className="col-md-6 text-center">
            {isTie && !isSaving
              ? t("scorecard.equalPointsNotPossibleToSave")
              : ""}
          </div>
        </div>
        <div className="row justify-content-center gx-5">
          <div className="col-md-3 d-grid">
            <button
              className="btn btn-warning"
              onClick={() => dispatch(Actions.clearCurrent())}
            >
              {t("scorecard.clear")}
            </button>
          </div>
          <div className="col-md-3 d-grid">
            <SubmitButton
              className="btn btn-success"
              nextPage="/display"
              setIsSaving={setIsSaving}
            >
              {t("scorecard.saveAndDisplay")}
            </SubmitButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scorecard;
