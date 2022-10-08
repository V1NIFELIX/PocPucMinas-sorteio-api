import {
  Controller,
  Inject,
  Post,
  Body,
  Param,
  Get,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
  Res,
  Patch,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { IVoucherService } from 'src/Domain/Interfaces/Services/i-voucher-service.interface';
import { Voucher } from '../../Domain/Models/Voucher';

@Controller('voucher')
export class VoucherController {
  constructor(
    @Inject('IVoucherService') private readonly cupomService: IVoucherService,
  ) {}

  @Get()
  public async getVouchers(
    @Query('aprovacaoPendente') aprovacaoPendente: boolean,
  ): Promise<any> {
    return this.cupomService.getVouchers(aprovacaoPendente);
  }

  @Get(':id')
  public async getVoucherByID(@Param('id') id: any): Promise<any> {
    return this.cupomService.getVoucherByID(id);
  }

  @Get('voucher-codigo/:codigo')
  public async getVoucherByCodigo(@Param('codigo') codigo: any): Promise<any> {
    return this.cupomService.getVoucherByCodigo(codigo);
  }

  @Get('user-voucher/:codigo')
  public async getVoucherWithUser(@Param('codigo') codigo: any): Promise<any> {
    return this.cupomService.getVoucherWithUser(codigo);
  }

  @Post()
  public async addVoucher(@Body() body: any): Promise<any> {
    return this.cupomService.addVoucher(body);
  }

  @Post(':codigo')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'cartaCompromisso', maxCount: 1 },
        { name: 'reciboEntregaPremio', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './comprovantes',
          filename: (req, file, callback) => {
            let name = file.originalname.split('.')[0];
            name = name.split(' ')[0];
            name = name.replace(/[^a-zA-Zs]/g, '');
            name = name.replace(/\s/g, '');
            const fileExtName = extname(file.originalname);
            const { codigo } = req.params;
            callback(null, `${name}-${Date.now()}-${codigo}${fileExtName}`);
          },
        }),
      },
    ),
  )
  public async updateVoucher(
    @Param('codigo') codigo: string,
    @Body() body: Voucher,
    @UploadedFiles()
    files: {
      cartaCompromisso?: Express.Multer.File;
      reciboEntregaPremio?: Express.Multer.File;
    },
  ): Promise<any> {
    const { cartaCompromisso, reciboEntregaPremio } = files;
    return this.cupomService.updateVoucher(
      body,
      codigo,
      cartaCompromisso[0].filename,
      reciboEntregaPremio[0].filename,
    );
  }

  @Delete(':id')
  public async delVoucher(@Param('id') id: any): Promise<any> {
    return this.cupomService.delVoucher(id);
  }

  @Get('comprovantes/:filename')
  public getComprovante(@Param('filename') filename, @Res() res) {
    return res.sendFile(filename, { root: './comprovantes' });
  }

  @Patch('aprovar/:codigo')
  public aprovarRetiradaDePremio(
    @Param('codigo') codigo: string,
    @Body() body: any,
  ) {
    const { aprovacao_pendente } = body;
    return this.cupomService.aprovarRetiradaDePremio(
      codigo,
      aprovacao_pendente,
    );
  }

  @Get('chave-acesso/:chave')
  public async getVoucherByChaveAcesso(
    @Param('chave') chave: any,
  ): Promise<any> {
    return this.cupomService.getVoucherByChaveAcesso(chave);
  }
}
