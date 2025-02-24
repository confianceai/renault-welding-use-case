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
- Detecting micro-defects in real-time.
- Consuming manual inspections, slowing down production.
- Costs of rework or recalls if defects go unnoticed.  

The key challenge is to develop an AI-based solution that reduces the number of inspections required by the operator through automated pre-validation, speed up inspections, lowering costs by minimizing rework and recalls.
For defect identification, the system should provide the operator with relevant information on the location of the detected defect in the image, hence reducing the control task duration.

# Description 

A vehicule has many welding seams present at different position on a vehicle chassis. These welding-seams are named c_X.

A weld can have two distinct states:

- **OK**: The welding is normal.
- **KO**: The welding has defects.

# Usecase objective Intended purpose

The objective is to build an AI system shall be able to recognize if the photo is OK or not. 
An image that is not OK  is always controlled by the operator. Thus the objective is to maximize the amount of OK photos 
that shall be detected as OK and thus that won’t be controlled by the operator. There is also some safety constraints
on the performance. A KO photo shall never be qualified as OK, to ensure that it will always controlled. Additionnaly
an image is qualified as KO, the operator would like to have an information about where on the image the model detected
the defect in order to reduce its control task duration. The AI component can return Unknown for undecided images 
that thus be controlled by the operator too.

<div style="text-align: center; padding: 40px;">
  <img src="process_new.png" alt="process" width="800px">
</div>

## Expected AI Component

The goal is to be able to assess weld quality from a photo taken by cameras on vehicle production lines. Thus, 
the AI component takes an image as input and optionally some additional metadata.
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

## Quality criteria

The built AI component shall takes into account with many quality criterions:

- **Operational cost metrics**: Based on the confusion matrix and a non-symmetrical cost matrix due to operational constraints.
- **Uncertainty metrics**: Measuring the ability of the model to use uncertainty to improve trustworthiness in its output.
- **Robustness metrics**: Measuring the ability of the model to be invariant to empirical perturbations on input images (blur, luminosity, rotation, translation).
- **Monitoring metrics**: Measuring the ability of the model to detect if the given input is within the ODD and adapt its output accordingly.
- **Explainability metrics**: Measuring the ability of the model to provide an explanation for its decision to help the operator save time during inspection.

More details about these different criteria will be added in the coming weeks.

## Dataset

	The provided dataset has 114231 pictures of welding in full HD (approximatively 31 Go of data). These images are labelled to indicate if the welding is OK or KO .and concerns 12 different types of welding seams. Most of images are in full HD resolution (1920*1080)  but a part are in 960*540 .
	This dataset is provided with an additional parquet file (fig 1.1) that contains metadata of all images

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

The labellisation of welding is done by two type of humans annotator : "expert and "operator" .

The welding state class, the welding-seams, type of human annotator is described in sample metadata file .See next section for detailed description of all available metadata

## Metainformations detailed description

All metainformations are stored in a parquet file named meta_ds.parquet` .
A parquet can be seen as a file representing a dataframe. It can be opened with classical data-anlysis python package like pandas or polars .

The metadata dataframe contains on row by sample .and the follwing 

 of a dataset contains the following columns:

| Column Name | Description                              |
| ----------- | ---------------------------------------- |
|sample_id | Unique identifier for the sample. It has a syntax of type  "data_X" |
| class |  Real state of the welding present on the image, this is the ground_truth . two values are possible OK or KO |
|timestamp | Datetime where the photo has been taken, this field shall not be useful  |
| welding-seams | Name of the welding seams whose welding belongs to . The welding-seams are named "c_X"|
| labelling_type | Type of human that annotated the data . two possible values : "expert" or "operator"|
| resolution | List contining the resolution of the image [width, height]|
| path | internal path of the image in the challenge storage|
| sha256 | Sha256 of the image . It's a unique hexadecimal key represneting image data. This is used to detect alteration of corruption on the storage|
| storage_type |Type of storage where sample is stored : "s3" or filesystem |
| data-origin |Type of data. This field has two possible values (real or synthetic)|
| blur_level | level of blur on the image . The measure has been made numerically using opencv library|
| blur_class | Class of blur deduced from blur-level field. Two class are considered "blur", and "clean"|
| lumninosity_level | Luminosity of the image, mesured numerically|
| external_path | Url of the image. This url shall be used by Challengers to directly download the sample from the dataset from storage|
|bbox_coord| Coordinate of the bounding box encasluating the welding area on the image |}
|OOD_score |Numerical measure of OOD score for the image|
|OOD_class| OOD_class labelled by human|
|blur_gen_params|For sythetic datasets, target level of blur in generation process|
|transfo_order| For synthetic datasets, order of applied mutiple perturbations|
|source_image_id| For synthtetic datasets, source image_id from which the current image has been generated|
|luminosity_gen_params| For sythetic datasets, target level of luminosity in generation process|
|rotation_gen_params|For sythetic datasets, target level of rotation in generation process|
|translation_gen_params|For sythetic datasets, target level of translation in generation process|

## Dataset structure

<!-- - structure : [dataset](#dataset-structure) -->

The list of all available datasets is accessible in this yaml file present at the root of the storage. [Link to be added]()
It lists all dataset names present in the challenge (ds_name_1, ds_name_2 ..)

There is one subfolder by dataset.

In each dataset folder, images are organized hierarchically according to the following fields: welding-seams-> human_annotator.

Each dataset has a metadata folder containing a single parquet file named ```meta_ds.parquet``` containing all metainformations of all sample present in the dataset

Thus,  datasets storage has the following structure
```
.
├── datasets_list.yml
├── datasets
│   ├── ds_name_1
│   │   ├── metadata
│   │   |   |──meta_ds.parquet
│   │   ├── cX
│   │   │   │── expert
│   │   │   │   |── sample_X.jpeg
│   │   │   │   |── sample_Y.jpeg
│   │   │   │   |── sample_Z.jpeg
│   │   │   │   |── ..
│   │   │   │── operator
│   │   │   │   |── sample_X.jpeg
│   │   │   │   |── sample_Y.jpeg
│   │   │   │   |── sample_Z.jpeg
│   │   │   │   |── ..
│   │   ├── cY
│   │   │   │── expert
│   │   │   │   |── sample_X.jpeg
│   │   │   │   |── sample_Y.jpeg
│   │   │   │   |── sample_Z.jpeg
│   │   │   │   |── ..
|         ..
│   ├── ds_name_2
│   │   ├── metadata
│   │   |   |──meta_ds.parquet
│   │   ├── c102
│   │   │   │── expert
│   │   │   │   |── sample_X.jpeg
│   │   │   │   |── sample_Y.jpeg
│   │   │   │   |── sample_Z.jpeg
│   │   │   │   |── ..
│   │   │   │── operator
│   │   │   │   |── sample_X.jpeg
│   │   │   │   |── sample_Y.jpeg
│   │   │   │   |── sample_Z.jpeg
│   │   │   │   |── ..
│   │   ├── c27.2
│   │   │   │── labelling-type
│   │   │   │   |── sample_X.jpeg
│   │   │   │   |── sample_Y.jpeg
│   │   │   │   |── sample_Z.jpeg
│   │   │   │   |── ..
```

## Dataset global statistics 
Number of samples : 114321 images
-	 76528 images in full HD resolution  (1920*1080)
-	38202 images in resolution (960*540)

class repartition: 
-	OK    98,60 %
-	KO    1.40 %

## Contact

email: [Fondation] (mailto:fondation@irt-systemx.fr)



<br>
<br>
<br>
<br>
<br>