module.exports = function (count) {
  const packageNames = [];
  const packageNamePrefixes = [];
  const srcWords = new Set(randomWords);
  for (let i = 0; i < count / 10 && srcWords.size; ++i) {
    const word = extractSampleFromSet(srcWords);
    packageNamePrefixes.push(word);
  }
  for (let i = 0; i < count && srcWords.size > 1; ++i) {
    const prefix =
      Math.random() > 0.7 ? sampleFromArray(packageNamePrefixes) : "";
    const main = extractSampleFromSet(srcWords);
    packageNames.push(prefix ? `@${prefix}/${main}` : main);
  }
  return packageNames.map((id) => ({
    id,
    weeklyDownloads:
      Math.random() > 0.5
        ? Math.trunc(Math.random() * 5000000)
        : Math.trunc(Math.random() * 500),
    dependencies: generateDependencies(id, packageNames),
  }));
};

function generateDependencies(id, allIds) {
  const count = Math.trunc(Math.random() * allIds.length);
  const res = [];
  const src = new Set(allIds);
  src.delete(id);
  for (let i = 0; i < count; ++i) {
    res.push(extractSampleFromSet(src));
  }
  return res;
}

function sampleFromArray(a) {
  return a[Math.trunc(Math.random() * a.length)];
}

function extractSampleFromSet(collection) {
  const idx = Math.trunc(Math.random() * collection.size);
  let i = 0;
  for (const x of collection) {
    if (i === idx) {
      collection.delete(x);
      return x;
    }
    i++;
  }
  throw new Error("Can't extract sample");
}

const randomWords = [
  "resink",
  "transversomedial",
  "pharyngopathy",
  "postmineral",
  "myelosyphilis",
  "silverer",
  "evincement",
  "phrygium",
  "punnigram",
  "imminution",
  "environmental",
  "sleepify",
  "nope",
  "wauken",
  "indignance",
  "knotwort",
  "apocodeine",
  "escortee",
  "dogwatch",
  "eaglewood",
  "unbrotherliness",
  "mulse",
  "dermobranchiata",
  "typhic",
  "poststertorous",
  "indevout",
  "anatomicopathologic",
  "unimpenetrable",
  "hoggy",
  "urrhodin",
  "Dioecia",
  "unchapter",
  "nonumbilicate",
  "zwitterionic",
  "apportionable",
  "ferulic",
  "statefulness",
  "pharyngotonsillitis",
  "Mimulus",
  "recce",
  "mutinously",
  "reboant",
  "marshwort",
  "lupoid",
  "chromatophilic",
  "lauder",
  "nirles",
  "esthesiometer",
  "semisocial",
  "unbeing",
  "kangaroo",
  "takosis",
  "inconvertibility",
  "anesthetist",
  "rumorproof",
  "thoracoscopy",
  "euphorbium",
  "bizet",
  "song",
  "dolichocephali",
  "platemaker",
  "vesicupapular",
  "electroforming",
  "dilatingly",
  "meethelp",
  "loincloth",
  "avowably",
  "counterindicate",
  "treacliness",
  "Epigonus",
  "airmark",
  "polarography",
  "precomposition",
  "lemography",
  "Apinage",
  "Taal",
  "logology",
  "probeer",
  "randomization",
  "poditic",
  "individualize",
  "castigate",
  "Biloculina",
  "overscrub",
  "koolah",
  "weetless",
  "erased",
  "layery",
  "discontinuee",
  "anaphylatoxin",
  "unwounded",
  "personalism",
  "howitzer",
  "hexahydroxy",
  "koku",
  "reamer",
  "tonguiness",
  "microgametocyte",
  "baba",
  "ludefisk",
  "novelwright",
  "swinehull",
  "Odonata",
  "indefinable",
  "faineance",
  "nidologist",
  "supracargo",
  "beriberic",
  "betso",
  "archheart",
  "snary",
  "Viminal",
  "Pygopodidae",
  "acetylenediurein",
  "asphalt",
  "preimpress",
  "fountainlet",
  "bejel",
  "unpictorially",
  "heliophyte",
  "chimopeelagic",
  "warison",
  "antivaccinist",
  "overtwine",
  "preremove",
  "nerval",
  "bufonite",
  "eradicator",
  "turtling",
  "winrace",
  "psychographic",
  "impalpably",
  "amygdalase",
  "Octogynia",
  "brimming",
  "grist",
  "casave",
  "brazilein",
  "afluking",
  "meliceris",
  "portative",
];
