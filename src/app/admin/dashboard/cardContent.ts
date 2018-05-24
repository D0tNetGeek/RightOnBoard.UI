export class CardContent {
    color: String;
    icon: String;
    contentType: String;
    label: String;
    value: String;
    footerText: String;
  
  
    constructor(index, category, title, contentType, footerText) {
      this.color = this.getRandomColor();
      this.icon = this.getRandomIcons(index);
      this.label = category;
      this.value = title;
      this.contentType = contentType;
      this.footerText = footerText;
    }
    getRandomColor() {
      let randClass = ["card-header-primary","card-header-info","card-header-success","card-header-warning","card-header-danger","card-header-rose"];
      return randClass[Math.round((Math.random() * 1000)) % 6];
    }
    getRandomIcons(i) {
      let randColors = ["content_copy", "store", "info_outline", "new_releases"];
      return randColors[i-1];
    }
    get
    
  }
  