import React, { useEffect, useMemo } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import Alerts from "./alerts";
import { Labels } from "../types";
import { RootState } from "../reducers";
import * as Actions from "../actions";

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const alerts = useSelector((state: RootState) => state.alerts);
  const labels = useSelector((state: RootState) => state.labels);

  const dantaiLabels: Labels = useMemo(
    () => ({
      id: "dantai",
      name: t("dantaiLabels.name"),
      labels: t("dantaiLabels.labels", { returnObjects: true }),
    }),
    [t],
  );

  const tenkaiLabels: Labels = useMemo(
    () => ({
      id: "tenkai",
      name: t("tenkaiLabels.name"),
      labels: t("tenkaiLabels.labels", { returnObjects: true }),
    }),
    [t],
  );

  useEffect(() => {
    if (labels.id === "dantai") {
      dispatch(Actions.changeLabels(dantaiLabels));
    } else {
      dispatch(Actions.changeLabels(tenkaiLabels));
    }
  }, [i18n.language, dantaiLabels, tenkaiLabels, dispatch, labels.id]);

  const handleDropdownAction = (key: string | null) => {
    switch (key) {
      case "dantai":
        dispatch(Actions.changeLabels(dantaiLabels));
        break;
      case "tenkai":
        dispatch(Actions.changeLabels(tenkaiLabels));
        break;
      case "cancel":
        dispatch(Actions.undoLastScore());
        break;
      case "clear":
        dispatch(Actions.clearScores());
        break;
      default:
        break;
    }
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div>
      <Alerts
        alerts={alerts}
        removeAlert={(id: string) => dispatch(Actions.removeAlert(id))}
      />
      <div className="container-fluid mt-4 pb-5 mb-5 px-4">
        <Outlet />
      </div>
      <Navbar fixed="bottom" expand="lg" bg="light" variant="light">
        <div className="container-fluid px-4">
          <Navbar.Brand as={NavLink} to="/scorecard">
            {labels.name}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/scorecard">
                {t("navigation.scoring")}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/history">
                {t("navigation.history")}
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={NavLink} to="/display?navigation=true">
                {t("navigation.showLatestRecord")}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/help">
                {t("navigation.instructions")}
              </Nav.Link>
              <NavDropdown
                title={t("navigation.settings")}
                id="settings-dropdown"
                onSelect={handleDropdownAction}
                drop="up"
              >
                <NavDropdown.Item onClick={() => handleLanguageChange("en")}>
                  {t("navigation.english")}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLanguageChange("fi")}>
                  {t("navigation.finnish")}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey={"cancel"}>
                  {t("navigation.deleteLatest")}
                </NavDropdown.Item>
                <NavDropdown.Item eventKey={"clear"}>
                  {t("navigation.clearHistory")}
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title={t("navigation.event")}
                id="event-dropdown"
                onSelect={handleDropdownAction}
                drop="up"
                align="end"
              >
                <NavDropdown.Item
                  eventKey={"dantai"}
                  active={labels.id === "dantai"}
                >
                  {t("dantaiLabels.name")}
                </NavDropdown.Item>
                <NavDropdown.Item
                  eventKey={"tenkai"}
                  active={labels.id === "tenkai"}
                >
                  {t("tenkaiLabels.name")}
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default App;
