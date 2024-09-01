"use strict";

let observer = new MutationObserver((mutationRecords) => {
  // console.log(mutationRecords); // console.log(изменения)

  let record = mutationRecords.filter(
    (mutationRecord) => mutationRecord.attributeName == "data-selected"
  );

  if (record.length == 0) {
    return;
  }

  // console.log(record[0].target.dataset.value);
  checkSelectOption(record[0].target);
});

observer.observe(document.querySelector("#theme"), {
  attributes: true,
});
