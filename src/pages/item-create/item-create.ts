import { Component, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Camera } from '@ionic-native/camera'
import { NavController, ViewController } from 'ionic-angular'
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput

  isReadyToSave: boolean
  item: any
  form: FormGroup

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public camera: Camera,
    public toastCtrl: ToastController) {
    this.form = formBuilder.group({
      profilePic: [''],
      name: ['', Validators.required],
      message: [''],
      height: ['', Validators.required],
      width: ['', Validators.required],
      length: ['', Validators.required],
      weight: ['', Validators.required]
    })
  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then(data => this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data }),
        err => alert('Unable to take photo'))
    } else
      this.fileInput.nativeElement.click()
  }

  processWebImage(event) {
    let reader = new FileReader()

    reader.onload = readerEvent => {
      let imageData = (readerEvent.target as any).result
      this.form.patchValue({ 'profilePic': imageData })
    }
    reader.readAsDataURL(event.target.files[0])
  }

  getProfileImageStyle() {
    return `url(${this.form.controls['profilePic'].value})`
  }

  cancel() {
    this.viewCtrl.dismiss()
  }

  done() {
    if (!this.form.valid) {
      let toast = this.toastCtrl.create({
        message: 'Please fill out all fields.',
        duration: 3000,
        position: 'bottom'
      })
      toast.present()
      return
    }
    this.viewCtrl.dismiss(this.form.value)
  }
}