---
title: Cumulative effects assessment and scenario planning for offshore wind development
categories: 
  - Cumulative effects assessment
  - Decision support tools
tags: 
  - Offshore wind
  - Cumulative effects
  - Scenario analysis
  - Shiny
  - Spatial planning
  - Marine mammals
date: 2026-04-24
instructors:
  - David Beauchesne
description: "Decision-support tool designed for exploring cumulative effects assessment outputs and building additive offshore wind project scenarios for designated wind energy areas."
gh: Ecosystem-Assessments/windcea
---

This project revolved around preparing a production-oriented decision-support application developed to make cumulative effects assessment outputs more accessible, transparent, and actionable for offshore wind planning. The tool allows users to explore precomputed baseline cumulative effects results, focus analyses on selected whale groups and pressure layers, and examine spatial patterns through interactive maps and summaries. Rather than functioning as a static viewer, the application is designed as an operational workflow that guides users from baseline assessment to scenario exploration and exportable reporting.

{{< youtube-narrow KYNOkJ_uvRc "Cumulative effects assessment and scenario planning for offshore wind development" >}}

The app was built around a structured workflow tailored to offshore wind use cases. Users can first review baseline CEA conditions for a selected scenario, inspect the vulnerability of marine mammals to multiple pressures, and identify where cumulative risk is concentrated. They can then move into a scenario-building workflow where designated wind energy areas are selected, candidate projects are added, and project-specific assumptions such as geometry, project type, and whale sensitivity are incorporated into the analysis. This creates a practical bridge between regional cumulative effects products and project-oriented planning questions.

A central design objective of this application is to avoid rerunning computationally expensive full CEA models during interactive use. Instead, the app relies on bundled precomputed baseline data and computes scenario results as additive deltas on top of the selected WEA baseline. This makes the workflow responsive enough for planning, review, and stakeholder discussion, while preserving methodological consistency with the underlying cumulative effects framework. The result is a tool that supports rapid comparison of baseline and scenario conditions without sacrificing reproducibility or analytical traceability.

The application also emphasizes clean software architecture and production readiness. Baseline content, WEA-specific layers, scenario outputs, and user-defined projects are managed through explicit app-state contracts and service-layer helpers, which keeps module inputs and outputs transparent. This structure supports maintainability, clearer testing boundaries, and more reliable deployment in operational settings. Export functionality extends beyond raw bundles of rasters and tables to include reproducible HTML reports that summarize selected inputs, key indicators, maps, project contributions, and scenario outputs for communication and documentation purposes.

Overall, this project demonstrates how cumulative effects science can be translated into a practical planning interface for offshore wind development. It helps connect regional ecological risk assessment with scenario design, spatial review, and reporting, making it easier for analysts, planners, and decision-makers to examine trade-offs and document the implications of offshore wind development in a cumulative effects context.
