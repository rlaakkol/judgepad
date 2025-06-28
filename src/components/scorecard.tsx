import React from "react";
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

  const handleValueChange = (id: number, value: number) => {
    const newRows = _.cloneDeep(rows);
    const i = newRows.findIndex((e) => e.id === id);
    newRows[i].value = value;
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
    <div>
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
          {isTie ? warningSign : ""}
        </div>
      </div>
      <div className="action-buttons">
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
            <SubmitButton className="btn btn-success" nextPage="/display">
              {t("scorecard.saveAndDisplay")}
            </SubmitButton>
          </div>
        </div>
        <div className="row justify-content-center mt-2">
          <div className="col-md-6 text-center">
            {isTie ? t("scorecard.equalPointsNotPossibleToSave") : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scorecard;
