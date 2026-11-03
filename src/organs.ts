import { Activity, Brain, Heart, Leaf } from "lucide-react";
import { adrenalsModel } from "./components/adrenals";
import { appendixModel } from "./components/appendix";
import { bladderModel } from "./components/bladder";
import { brainModel } from "./components/brain";
import { breastModel } from "./components/breast";
import { diaphragmModel } from "./components/diaphragm";
import { earModel } from "./components/ear";
import { esophagusModel } from "./components/esophagus";
import { eyeModel } from "./components/eye";
import { gallbladderModel } from "./components/gallbladder";
import { hairModel } from "./components/hair";
import { heartModel } from "./components/heart";
import { intestinesModel } from "./components/intestines";
import { jointsModel } from "./components/joints";
import { kidneysModel } from "./components/kidneys";
import { larynxModel } from "./components/larynx";
import { liverModel } from "./components/liver";
import { lungsModel } from "./components/lungs";
import { lymphModel } from "./components/lymph";
import { musclesModel } from "./components/muscles";
import { nailsModel } from "./components/nails";
import { nervesModel } from "./components/nerves";
import { noseModel } from "./components/nose";
import { pancreasModel } from "./components/pancreas";
import { parathyroidModel } from "./components/parathyroid";
import { pharynxModel } from "./components/pharynx";
import { pinealModel } from "./components/pineal";
import { pituitaryModel } from "./components/pituitary";
import { prostateModel } from "./components/prostate";
import { salivaryGlandsModel } from "./components/salivary-glands";
import { skeletonModel } from "./components/skeleton";
import { skinModel } from "./components/skin";
import { spinalCordModel } from "./components/spinal-cord";
import { spleenModel } from "./components/spleen";
import { stomachModel } from "./components/stomach";
import { teethModel } from "./components/teeth";
import { thymusModel } from "./components/thymus";
import { thyroidModel } from "./components/thyroid";
import { tongueModel } from "./components/tongue";
import { uterusModel } from "./components/uterus";
import { vesselsModel } from "./components/vessels";
import { vestibularModel } from "./components/vestibular";

const initialOrgans = [
  {
    id: "heart",
    model: heartModel,
    icon: Heart,
    system: "Cardiovascular system",
    latin: "Cor",
    description:
      "Explore the chambers, muscular walls, and major vessels of the heart. Follow the structures that receive blood and direct it toward the lungs and the rest of the body.",
    focus: "Blood circulation",
    region: "Thorax",
    question: "Which chamber receives oxygen-rich blood from the lungs?",
    answers: ["Right atrium", "Left atrium", "Right ventricle"],
    correct: 1,
    explanation:
      "The left atrium receives blood from the lungs and passes it to the left ventricle.",
  },
  {
    id: "brain",
    model: brainModel,
    icon: Brain,
    system: "Nervous system",
    latin: "Encephalon",
    description:
      "Explore the brain from multiple perspectives. Select individual structures to understand their position and discover how the regions fit together.",
    focus: "Neural coordination",
    region: "Head",
    question: "Which system does the brain belong to?",
    answers: ["Respiratory system", "Urinary system", "Nervous system"],
    correct: 2,
    explanation:
      "The brain is part of the central nervous system, together with the spinal cord.",
  },
  {
    id: "lungs",
    model: lungsModel,
    icon: Activity,
    system: "Respiratory system",
    latin: "Pulmones",
    description:
      "Explore the paired lungs and their structures. Rotate the model to compare their shape and investigate the anatomy of the respiratory system.",
    focus: "Gas exchange",
    region: "Thorax",
    question: "What is the primary role of the lungs?",
    answers: ["Gas exchange", "Pumping blood", "Filtering blood into urine"],
    correct: 0,
    explanation:
      "The lungs exchange oxygen and carbon dioxide between air and blood.",
  },
  {
    id: "kidneys",
    model: kidneysModel,
    icon: Leaf,
    system: "Urinary system",
    latin: "Renes",
    description:
      "Explore the kidneys in three dimensions. Select the structures in the anatomy list to study their spatial relationships and read their descriptions.",
    focus: "Filtration",
    region: "Abdomen",
    question: "Which system includes the kidneys?",
    answers: ["Nervous system", "Urinary system", "Respiratory system"],
    correct: 1,
    explanation:
      "The kidneys are part of the urinary system and filter blood to form urine.",
  },
];

const additionalModels = [
  {
    id: "adrenals",
    model: adrenalsModel,
    system: "Endocrine system",
    region: "Abdomen",
    focus: "Hormone secretion",
  },
  {
    id: "appendix",
    model: appendixModel,
    system: "Digestive system",
    region: "Abdomen",
    focus: "Immune support",
  },
  {
    id: "bladder",
    model: bladderModel,
    system: "Urinary system",
    region: "Pelvis",
    focus: "Urine storage",
  },
  {
    id: "breast",
    model: breastModel,
    system: "Reproductive system",
    region: "Thorax",
    focus: "Milk production",
  },
  {
    id: "diaphragm",
    model: diaphragmModel,
    system: "Respiratory system",
    region: "Thorax",
    focus: "Breathing",
  },
  {
    id: "ear",
    model: earModel,
    system: "Sensory system",
    region: "Head",
    focus: "Hearing and balance",
  },
  {
    id: "esophagus",
    model: esophagusModel,
    system: "Digestive system",
    region: "Neck and thorax",
    focus: "Food transport",
  },
  {
    id: "eye",
    model: eyeModel,
    system: "Sensory system",
    region: "Head",
    focus: "Vision",
  },
  {
    id: "gallbladder",
    model: gallbladderModel,
    system: "Digestive system",
    region: "Abdomen",
    focus: "Bile storage",
  },
  {
    id: "hair",
    model: hairModel,
    system: "Integumentary system",
    region: "Body surface",
    focus: "Protection",
  },
  {
    id: "intestines",
    model: intestinesModel,
    system: "Digestive system",
    region: "Abdomen",
    focus: "Digestion and absorption",
  },
  {
    id: "joints",
    model: jointsModel,
    system: "Musculoskeletal system",
    region: "Throughout the body",
    focus: "Movement",
  },
  {
    id: "larynx",
    model: larynxModel,
    system: "Respiratory system",
    region: "Neck",
    focus: "Voice production",
  },
  {
    id: "liver",
    model: liverModel,
    system: "Digestive system",
    region: "Abdomen",
    focus: "Nutrient processing",
  },
  {
    id: "lymph",
    model: lymphModel,
    system: "Lymphatic system",
    region: "Throughout the body",
    focus: "Immune defense",
  },
  {
    id: "muscles",
    model: musclesModel,
    system: "Musculoskeletal system",
    region: "Throughout the body",
    focus: "Movement",
  },
  {
    id: "nails",
    model: nailsModel,
    system: "Integumentary system",
    region: "Hands and feet",
    focus: "Protection",
  },
  {
    id: "nerves",
    model: nervesModel,
    system: "Nervous system",
    region: "Throughout the body",
    focus: "Signal transmission",
  },
  {
    id: "nose",
    model: noseModel,
    system: "Respiratory system",
    region: "Head",
    focus: "Air conditioning and smell",
  },
  {
    id: "pancreas",
    model: pancreasModel,
    system: "Digestive and endocrine systems",
    region: "Abdomen",
    focus: "Enzymes and hormones",
  },
  {
    id: "parathyroid",
    model: parathyroidModel,
    system: "Endocrine system",
    region: "Neck",
    focus: "Calcium regulation",
  },
  {
    id: "pharynx",
    model: pharynxModel,
    system: "Digestive and respiratory systems",
    region: "Neck",
    focus: "Swallowing and breathing",
  },
  {
    id: "pineal",
    model: pinealModel,
    system: "Endocrine system",
    region: "Head",
    focus: "Sleep rhythm regulation",
  },
  {
    id: "pituitary",
    model: pituitaryModel,
    system: "Endocrine system",
    region: "Head",
    focus: "Hormone regulation",
  },
  {
    id: "prostate",
    model: prostateModel,
    system: "Reproductive system",
    region: "Pelvis",
    focus: "Seminal fluid secretion",
  },
  {
    id: "salivary-glands",
    model: salivaryGlandsModel,
    system: "Digestive system",
    region: "Head and neck",
    focus: "Saliva production",
  },
  {
    id: "skeleton",
    model: skeletonModel,
    system: "Musculoskeletal system",
    region: "Throughout the body",
    focus: "Support and protection",
  },
  {
    id: "skin",
    model: skinModel,
    system: "Integumentary system",
    region: "Body surface",
    focus: "Protection",
  },
  {
    id: "spinal-cord",
    model: spinalCordModel,
    system: "Nervous system",
    region: "Spinal canal",
    focus: "Signal transmission",
  },
  {
    id: "spleen",
    model: spleenModel,
    system: "Lymphatic system",
    region: "Abdomen",
    focus: "Blood filtration",
  },
  {
    id: "stomach",
    model: stomachModel,
    system: "Digestive system",
    region: "Abdomen",
    focus: "Digestion",
  },
  {
    id: "teeth",
    model: teethModel,
    system: "Digestive system",
    region: "Mouth",
    focus: "Chewing",
  },
  {
    id: "thymus",
    model: thymusModel,
    system: "Lymphatic system",
    region: "Thorax",
    focus: "Immune cell development",
  },
  {
    id: "thyroid",
    model: thyroidModel,
    system: "Endocrine system",
    region: "Neck",
    focus: "Metabolic regulation",
  },
  {
    id: "tongue",
    model: tongueModel,
    system: "Digestive and sensory systems",
    region: "Mouth",
    focus: "Taste and swallowing",
  },
  {
    id: "uterus",
    model: uterusModel,
    system: "Reproductive system",
    region: "Pelvis",
    focus: "Support for pregnancy",
  },
  {
    id: "vessels",
    model: vesselsModel,
    system: "Cardiovascular system",
    region: "Throughout the body",
    focus: "Blood transport",
  },
  {
    id: "vestibular",
    model: vestibularModel,
    system: "Sensory system",
    region: "Inner ear",
    focus: "Balance",
  },
];

const allModels = [...initialOrgans, ...additionalModels];
export const organs = [
  ...initialOrgans,
  ...additionalModels.map((entry, index) => {
    const answer = entry.model.structures[0].label;
    const labels = new Set(entry.model.structures.map((s) => s.label));
    const distractors = [
      ...new Set(
        allModels.flatMap((o) => o.model.structures.map((s) => s.label)),
      ),
    ]
      .filter((label) => !labels.has(label))
      .slice(0, 2);
    const correct = index % 3;
    const answers = [...distractors];
    answers.splice(correct, 0, answer);
    return {
      ...entry,
      icon: Activity,
      latin: entry.model.name,
      description:
        "Explore {name} in 3D. Select a structure to inspect its anatomy, change the camera view, and read its description.",
      question: "Which structure is included in this model?",
      answers,
      correct,
      explanation:
        "This model includes {name}. Select it in the structure list to explore it.",
    };
  }),
];
export type Organ = (typeof organs)[number];
