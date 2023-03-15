import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { TransitionCheckState } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.css']
})
export class KorisniciComponent implements OnInit {

  constructor(private ruter:Router,private userService: UserService) { }

  form: FormGroup;
  imageData: string;
  poruka:string;

  ngOnInit(): void {
    this.loginedUser=JSON.parse(localStorage.getItem("ulogovan"));
    if(this.loginedUser.type!="admin")this.ruter.navigate(['']);
    this.form = new FormGroup({
      username: new FormControl(null,Validators.required),
      password: new FormControl(null,[Validators.required,Validators.pattern(/^(?!.*([A-Za-z0-9!@#$%^&*()_+{}[\]|\\\/?.,><:"';])\1{3})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]|\\\/?.,><:"';])[A-Za-z\d!@#$%^&*()_+{}[\]|\\\/?.,><:"';]{8,24}$/)]),
      firstname: new FormControl(null,Validators.required),
      lastname: new FormControl(null,Validators.required),
      country: new FormControl(null,Validators.required),
      city: new FormControl(null,Validators.required),
      mail: new FormControl(null,[Validators.required,Validators.email]),
      imagePath: new FormControl(null),
      confirm: new FormControl(null,[Validators.required,this.matchValues('password')])
      
    });
    this.userService.getProfiles().subscribe((users:User[])=>{
      this.kor=users;
    })
  }

  loginedUser:User;
  kor:User[];

  matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
}

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ imagePath: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      }
      reader.readAsDataURL(file);
    }

  }

  onSubmit() {
    console.log(this.form.value.username, this.form.value.firstname, this.form.value.lastname, this.form.value.password, this.form.value.mail, this.form.value.country, this.form.value.city, this.form.value.imagePath);
    if (this.imageData != null) {
      this.userService.upload(this.form.value.imagePath);
      
    }
    
    this.userService.register(this.form.value.username, this.form.value.firstname, this.form.value.lastname, this.form.value.password, this.form.value.mail, this.form.value.country, this.form.value.city, this.form.value.imagePath).subscribe((resp)=>{
      if(resp['poruka']=='postoji'){
        this.poruka='Postoji takav korisnik';
      }
    });
    this.form.reset();

    this.imageData = null;
    
  }

  country_list = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

  get username(){ return this.form.get('username')}
  get firstname(){ return this.form.get('firstname')}
  get lastname(){ return this.form.get('lastname')}
  get password(){ return this.form.get('password')}
  get mail(){ return this.form.get('mail')}
  get country(){ return this.form.get('country')}
  get city(){ return this.form.get('city')}
  get confirm(){return this.form.get('confirm')}

  home() {
    this.ruter.navigate(['admin']);
  }

  logout() {
    localStorage.clear();
    this.ruter.navigate(['']);

  }

  nekretnine(){
    this.ruter.navigate(['nekretnineadmin'])
  }

  korisnici(){
    this.ruter.navigate(['korisnici'])
  }

  registracije(){
    this.ruter.navigate(['registracije'])
  }

  sifra(){
    this.ruter.navigate(['sifraadmin'])
  }

  ponude(){
    this.ruter.navigate(['ponudeadmin'])
  }

  displayedColumns:string[]=['imagePath','username','mail','firstname','lastname','country','city','izmeni','obrisi'];

  izmeni(username){
    localStorage.setItem("useredit",JSON.stringify(username));
    this.ruter.navigate(['adminizmeni']);
  }

  obrisi(username){
    this.userService.odbijProfil(username).subscribe((res)=>{
      window.location.reload();
    })
  }
}
