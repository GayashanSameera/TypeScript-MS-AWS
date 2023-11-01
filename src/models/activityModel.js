const activityModel = {
    replacePlaceholders = (template, placeholderData) => {
        return template.replace(/%\w+%/g, (all) => (placeholderData[all] || all));
    }
  };
  
  export default activityModel;