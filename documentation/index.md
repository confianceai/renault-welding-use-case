---
layout: HomeLayout
home: true

heroImage: hero_image_3D.png
heroText: "Renault Welding inspection"
tagline: "One the use cases promoted by the European Trustworthy AI Foundation, with the support of Renault Group"
# actionText: Get started
# actionLink: /getStarted/
# secondaryActionText: Guide and documentation
# secondaryActionLink: /guides/
---

## Context
In the highly competitive automotive industry, quality control is essential to ensure the reliability of vehicles and user safety. A failure in quality control can severely jeopardize safety, result in significant financial costs, and cause substantial reputational damage to the company involved.

One of the challenges for Renault is to improve the reliability of quality control for welding seams in automotive body manufacturing. Currently, this inspection is consistently performed by a human operator due to the legal dimension related to user safety, but can have limitations, such as:
- Inconsistent inspection results due to human error.
- detecting micro-defects in real-time.
- consuming manual inspections, slowing down production.
- costs of rework or recalls if defects go unnoticed.  

The key challenge is to develop an AI-based solution that reduces the number of inspections required by the operator through automated pre-validation, speed up inspections, lowering costs by minimizing rework and recalls.
For defect identification, the system should provide the operator with relevant information on the location of the detected defect in the image, hence reducing the control task duration.

# Description 

This industrial use case, provided by Renault Group, represents the “Visual Inspection” thematic through a classification problem.
The goal is to be able to assess weld quality from a photo taken by cameras on vehicle production lines.

A weld can have two distinct states:

- **OK**: The welding is normal.
- **KO**: The welding has defects.

## Expected AI Component

The AI component takes an image as input and optionally some additional metadata.
Three possible outputs are possible:

- **OK**: The welding in the image has no defect.
- **KO**: The welding in the image has defects.
- **UNK**: The welding state is UNKNOWN. UNKNOWN is used to indicate that the model is not sure about the predicted class. As we will see later in the evaluation process, an UNKNOWN output can be less penalizing than a False Negative (meaning a true KO predicted as OK), which has a critical cost.

This is illustrated by the figure below:

<div style="text-align: center; padding: 40px;">
  <img src="process.png" alt="process" width="800px">
</div>

Optionally, the AI component could additionally return the probability associated with each possible output state. If present, this information will be used by the evaluation process and could improve the final quality score of the solution.

## Operational Domain Design (ODD) Definition

Optionally, the AI component could additionally return the probability associated with each possible output state. If present, this information will be used by the evaluation process and could improve the final quality score of the solution.

The Operational Domain Design defines the set of input images for which the AI component is expected to return a predicted state.

Here are the conditions and environments in which the AI system is expected to operate effectively and safely:

- The luminosity of an image can be between **60 and 140 lumens**.
- The level of blur (due to vibration of the production line) of an image can be **variable**.
- The orientation of welding seams can vary in the image with a **rotation angle between -10° and 10°**.
- The position of the piece in the image can be **translated by 5 millimeters** (corresponding to **100 pixels** in the image depending on seams and camera position).

For images that are out of the ODD, the AI component shall return **“UNKNOWN”**, and the image is sent to the operator.

The operational constraints are as follows:

- **False negative detections** (defective welding qualified as OK by AI system) have a safety cost and shall **imperatively be minimized**. This is a **primary objective**.
- **Maximize the accuracy** of prediction.
- Some welding seams are **more critical than others**, depending on their position. The level of criticality impacts the cost of false negatives.

## Evaluation Criteria

The submitted AI component will be evaluated according to different quality evaluation metrics, including:

- **Operational cost metrics**: Based on the confusion matrix and a non-symmetrical cost matrix due to operational constraints.
- **Uncertainty metrics**: Measuring the ability of the model to use uncertainty to improve trustworthiness in its output.
- **Robustness metrics**: Measuring the ability of the model to be invariant to empirical perturbations on input images (blur, luminosity, rotation, translation).
- **Monitoring metrics**: Measuring the ability of the model to detect if the given input is within the ODD and adapt its output accordingly.
- **Explainability metrics**: Measuring the ability of the model to provide an explanation for its decision to help the operator save time during inspection.

More details about these different criteria will be added in the coming weeks.

## Dataset

The dataset contains 22,851 images split among three different welding seams. An important property of this dataset is that it is highly unbalanced. There are only 500 KO images in the entire dataset.

Here is below some examples of weldings `OK` and `KO` on two different welding seams `c10` and `c19`.

<div style="display: flex; justify-content: center; gap:30%">
  <b>c10 OK</b>
  <b>c19 OK</b>
</div>
<div style="display: flex; justify-content: center; flex-wrap:wrap; gap:5px">
  <img src="welds/C10_OK.jpg" alt="process" width="40%">
  <img src="welds/C19_OK.jpg" alt="c19 ok" width="40%">
</div>
<br>
<div style="display: flex; justify-content: center; gap:30%">
  <b>c10 KO</b>
  <b>c19 KO</b>
</div>
<div style="display: flex; justify-content: center; flex-wrap:wrap; gap:5px">
  <img src="welds/C10_RETOUCHE.jpg" alt="process" width="40%">
  <img src="welds/C19_RETOUCHE.jpg" alt="C19 retouche" width="40%">
</div>

<br>
<br>
<br>

## Contact

email: [support@confiance.ai](mailto:challenge.confiance@irt-systemx.fr)

Discord: [European Trustworthy AI Foundation #renault-welding-use-case](https://discord.gg/G9RhAECmVr)

<br>
<br>
<br>
<br>
<br>